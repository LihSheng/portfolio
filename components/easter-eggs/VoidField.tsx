'use client';

import { useEffect, useRef, useState } from 'react';
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

/**
 * 404 easter egg: a drifting star field behind the whole viewport. Click
 * stars to collect them. The canvas sits below the page content, so the real
 * 404 links stay fully usable; only clicks on empty paper reach it.
 */
export default function VoidField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [caught, setCaught] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let localCaught = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const color = () => {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue('--ink').trim() || '#1D1B17';
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color();
      for (const s of stars) {
        if (!reducedMotion) {
          s.x = (s.x + s.vx + width) % width;
          s.y = (s.y + s.vy + height) % height;
        }
        const alpha = reducedMotion ? 0.5 : 0.35 + 0.35 * Math.sin(t / 700 + s.twinkle);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const hit = (x: number, y: number) => stars.findIndex((s) => Math.hypot(s.x - x, s.y - y) < 14);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      canvas.style.cursor = hit(e.clientX - rect.left, e.clientY - rect.top) >= 0 ? 'pointer' : '';
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const i = hit(e.clientX - rect.left, e.clientY - rect.top);
      if (i < 0) return;
      stars.splice(i, 1);
      localCaught += 1;
      setCaught(localCaught);
      if (reducedMotion) draw(performance.now());
      if (localCaught === GOAL) {
        setDone(true);
        announceEasterEgg({ id: 'void', message: 'You collected 10 stars from the void. The page is still missing, though.' });
      }
    };

    resize();
    seed();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('click', onClick);
    };
  }, [reducedMotion]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 -z-10 h-full w-full"
      />
      {caught > 0 && (
        <p
          className="pointer-events-none fixed bottom-16 left-1/2 -translate-x-1/2 font-mono text-xs text-muted"
          aria-live="polite"
        >
          {done ? 'Void cleared.' : `Stars collected: ${caught} / ${GOAL}`}
        </p>
      )}
    </>
  );
}

