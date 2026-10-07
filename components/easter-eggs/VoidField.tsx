'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { announceEasterEgg, usePrefersReducedMotion } from '@/lib/easter-eggs';

interface Star {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  twinkle: number;
}

const STAR_COUNT = 90;
const GOAL = 10;
const HIT_RADIUS = 22;
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [contenteditable="true"]';

/**
 * 404 easter egg: a viewport-wide drifting star field.
 *
 * The canvas is portalled to document.body so PageFade's transform cannot
 * constrain position: fixed to the 680px content column. It is visual-only
 * (pointer-events: none); pointer hit-testing happens at window level so the
 * normal 404 links remain fully interactive.
 */
export default function VoidField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [caught, setCaught] = useState(0);
  const done = caught >= GOAL;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let localCaught = 0;
    let hoveredIndex = -1;
    let pointerX = 0;
    let pointerY = 0;
    let pointerCanCollect = false;
    const previousBodyCursor = document.body.style.cursor;

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));

    const color = () => {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue('--ink').trim() || '#1D1B17';
    };

    const hit = (x: number, y: number) =>
      stars.findIndex((s) => Math.hypot(s.x - x, s.y - y) < HIT_RADIUS);

    const refreshHover = () => {
      const nextHoveredIndex =
        pointerCanCollect && localCaught < GOAL ? hit(pointerX, pointerY) : -1;

      if (nextHoveredIndex === hoveredIndex) return;

      hoveredIndex = nextHoveredIndex;
      document.body.style.cursor = hoveredIndex >= 0 ? 'pointer' : previousBodyCursor;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color();

      if (!reducedMotion) {
        for (const star of stars) {
          star.x = (star.x + star.vx + width) % width;
          star.y = (star.y + star.vy + height) % height;
        }
      }

      // Stars can move even while the pointer is stationary, so hover state
      // must be recomputed every frame from the last known pointer position.
      refreshHover();

      stars.forEach((s, index) => {
        const hovered = index === hoveredIndex;
        const alpha = reducedMotion
          ? hovered
            ? 0.85
            : 0.5
          : 0.32 + 0.3 * Math.sin(t / 700 + s.twinkle);

        ctx.globalAlpha = hovered ? 0.9 : alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, hovered ? s.r + 2 : s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (const star of stars) {
        star.x = Math.min(Math.max(star.x, 0), width);
        star.y = Math.min(Math.max(star.y, 0), height);
      }

      if (reducedMotion) draw(performance.now());
    };

    const seed = () => {
      const starter: Star = {
        x: width * 0.88,
        y: height * 0.32,
        r: 3,
        vx: 0.25,
        vy: 0,
        twinkle: 0,
      };

      stars = [
        starter,
        ...Array.from({ length: STAR_COUNT - 1 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          twinkle: Math.random() * Math.PI * 2,
        })),
      ];
    };

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerCanCollect = !isInteractiveTarget(e.target) && localCaught < GOAL;

      refreshHover();
      if (reducedMotion) draw(performance.now());
    };

    const onPointerLeave = () => {
      pointerCanCollect = false;
      refreshHover();
      if (reducedMotion) draw(performance.now());
    };

    const onClick = (e: MouseEvent) => {
      if (isInteractiveTarget(e.target) || localCaught >= GOAL) return;

      const index = hit(e.clientX, e.clientY);
      if (index < 0) return;

      stars.splice(index, 1);
      hoveredIndex = -1;
      localCaught += 1;
      setCaught(localCaught);
      document.body.style.cursor = previousBodyCursor;

      if (reducedMotion) draw(performance.now());

      if (localCaught === GOAL) {
        announceEasterEgg({
          id: 'void',
          message: 'You collected 10 stars from the void. The page is still missing, though.',
        });
      }
    };

    resize();
    seed();
    raf = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('click', onClick);
      document.body.style.cursor = previousBodyCursor;
    };
  }, [mounted, reducedMotion]);

  return (
    <>
      <p
        className="mt-8 font-mono text-xs text-muted"
        aria-live="polite"
        data-testid="void-progress"
      >
        {done
          ? 'Void cleared. 10 / 10 stars caught.'
          : caught > 0
            ? `Stars caught: ${caught} / ${GOAL}`
            : 'The void is not empty. Catch 10 drifting stars.'}
      </p>

      {mounted &&
        createPortal(
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            data-testid="void-field-canvas"
            className="pointer-events-none fixed inset-0 z-0"
          />,
          document.body
        )}
    </>
  );
}
