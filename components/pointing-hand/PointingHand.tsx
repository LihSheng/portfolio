'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useFeatureFlag } from '@/lib/feature-flags';
import { useMounted } from '@/lib/hooks/useMounted';
import { usePointingHandEnabled } from '@/lib/pointing-hand/preference';
import {
  armLength,
  clampReach,
  lerpAngle,
  shoulderFor,
  smoothing,
  solveElbow,
  type Point,
} from '@/lib/pointing-hand/geometry';
import { drawArm, drawHand, FINGERTIP, type HandColors } from './draw';

/** Elements the hand taps when the pointer is over them. */
const INTERACTIVE = 'a, button, input, textarea, select, [role="button"]';
/** The element the hand points at when the pointer is away. */
const REST_SELECTOR = '[data-hand-rest]';

/** Phones are too narrow: the arm would cover the intro text. Matches Tailwind's `sm` breakpoint. */
const WIDE_ENOUGH = '(min-width: 640px)';

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE_ENOUGH);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/**
 * An ink-drawn arm that reaches up from the bottom of the screen and points at the cursor.
 * At rest (no pointer, touch released, or reduced motion) it points at the end of the
 * element marked with data-hand-rest. Rendered into document.body so that the
 * transformed PageFade wrapper does not become the containing block of the fixed canvas.
 */
export function PointingHand() {
  const mounted = useMounted();
  const flagOn = useFeatureFlag('pointingHand');
  const enabled = usePointingHandEnabled();
  const wide = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE_ENOUGH).matches, () => false);
  const active = mounted && flagOn && enabled && wide;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!active || !canvas || !ctx) return;

    // Kept live: a visitor can turn on reduced motion while the page is open
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = reducedMotionQuery.matches;
    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
    };
    reducedMotionQuery.addEventListener('change', onReducedMotionChange);
    let width = 0;
    let height = 0;
    let dpr = 1;
    const scale = 1.1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };
    resize();

    let colors: HandColors = { ink: '', paper: '', hatch: '' };
    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors = {
        ink: style.getPropertyValue('--ink').trim(),
        paper: style.getPropertyValue('--paper').trim(),
        hatch: style.getPropertyValue('--hairline-strong').trim(),
      };
    };
    readColors();

    // Pointer state
    const pointer = { x: 0, y: 0, following: false, lastMove: 0, overInteractive: false };
    let poke = 0;
    let touchRelease: ReturnType<typeof setTimeout> | undefined;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' && e.buttons === 0) return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.following = true;
      pointer.lastMove = performance.now();
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      pointer.following = true;
      poke = 1;
      clearTimeout(touchRelease);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      touchRelease = setTimeout(() => {
        pointer.following = false;
      }, 1400);
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        pointer.following = false;
        pointer.overInteractive = false;
      }
    };
    const onOver = (e: PointerEvent) => {
      pointer.overInteractive = e.target instanceof Element && !!e.target.closest(INTERACTIVE);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointerout', onOut, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });

    const restPoint = (): Point => {
      const el = document.querySelector(REST_SELECTOR);
      const box = el?.getBoundingClientRect();
      if (!el || !box || box.bottom < 0 || box.top > height) {
        // Tuck the arm away below the screen
        return { x: width + 260, y: height * 0.7 };
      }
      const range = document.createRange();
      range.selectNodeContents(el);
      const lines = range.getClientRects();
      const last = lines[lines.length - 1] ?? box;
      return { x: last.right + 10, y: last.top + last.height * 0.58 };
    };

    // Simulation state
    const start = restPoint();
    const wrist: Point = { x: start.x + 120, y: start.y + 30 };
    let angle = Math.PI;
    let flip = -1;
    let elbow: Point | null = null;
    let last = performance.now();
    let frame = 0;
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (++frame % 30 === 0) readColors(); // follows theme changes, including the terminal easter egg

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const following = pointer.following && !reduceMotion;
      const aim = following ? { x: pointer.x, y: pointer.y } : restPoint();
      if (following && now - pointer.lastMove > 3000) aim.y += Math.sin(now / 400) * 3;

      poke = Math.max(0, poke - dt * 5);
      const tap = following && pointer.overInteractive ? Math.sin(now / 90) * 0.5 + 0.5 : 0;
      const gap = (following ? (pointer.overInteractive ? 4 : 22) : 6) - poke * 14 - tap * 5;
      const reach = Math.hypot(FINGERTIP.x, FINGERTIP.y) * scale + gap;

      const length = armLength(width, height);
      const shoulder = shoulderFor(width, height);
      // Aim from the elbow so the hand stays in line with the forearm
      const from = elbow ?? shoulder;
      const targetAngle = Math.atan2(aim.y - from.y, aim.x - from.x);
      angle = reduceMotion ? targetAngle : lerpAngle(angle, targetAngle, smoothing(dt, 14));

      const target = clampReach(
        shoulder,
        { x: aim.x - Math.cos(targetAngle) * reach, y: aim.y - Math.sin(targetAngle) * reach },
        length
      );
      const k = reduceMotion ? 1 : smoothing(dt, 11);
      wrist.x += (target.x - wrist.x) * k;
      wrist.y += (target.y - wrist.y) * k;

      elbow = solveElbow(shoulder, wrist, length);
      const cuff = { x: wrist.x - Math.cos(angle) * 10 * scale, y: wrist.y - Math.sin(angle) * 10 * scale };
      drawArm(ctx, colors, shoulder, elbow, cuff, scale);

      // Turn the wrist over when pointing left so the thumb stays on top
      const flipTarget = Math.cos(angle) >= 0 ? 1 : -1;
      flip += (flipTarget - flip) * (reduceMotion ? 1 : smoothing(dt, 9));
      const shownFlip = Math.abs(flip) < 0.12 ? 0.12 * (Math.sign(flip) || 1) : flip;
      drawHand(ctx, colors, wrist, angle, scale, shownFlip, poke * 3 + tap * 2);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(touchRelease);
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointerout', onOut);
      document.removeEventListener('pointerover', onOver);
    };
  }, [active]);

  if (!active) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-pointing-hand=""
      className="pointer-events-none fixed inset-0 z-40 h-full w-full print:hidden"
    />,
    document.body
  );
}
