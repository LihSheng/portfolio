'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

type Point = { x: number; y: number };
type Status = 'ready' | 'playing' | 'paused' | 'over' | 'won';

const GRID = 20; // cells per side
const CELL = 24; // CSS pixels per cell at full size
const SIZE = GRID * CELL;
const TICK_MS = 110;
const BEST_KEY = 'snake-best';

const DIRECTIONS: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

function startingSnake(): Point[] {
  const mid = Math.floor(GRID / 2);
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
}

function randomFood(snake: Point[]): Point {
  const taken = new Set(snake.map((p) => `${p.x},${p.y}`));
  const free: Point[] = [];
  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      if (!taken.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  return free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 };
}

function readBest(): number {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

// In-memory fallback so the best score still works when storage is blocked.
let memoryBest = 0;
const bestListeners = new Set<() => void>();

function getBest(): number {
  return Math.max(readBest(), memoryBest);
}

function writeBest(value: number) {
  memoryBest = value;
  try {
    window.localStorage.setItem(BEST_KEY, String(value));
  } catch {
    // Storage blocked: the best score just lasts for this visit.
  }
  bestListeners.forEach((listener) => listener());
}

function subscribeBest(listener: () => void) {
  bestListeners.add(listener);
  return () => {
    bestListeners.delete(listener);
  };
}

export function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>(startingSnake());
  const dirRef = useRef<Point>({ x: 1, y: 0 });
  const queueRef = useRef<Point[]>([]);
  const foodRef = useRef<Point>({ x: GRID - 5, y: Math.floor(GRID / 2) });
  const statusRef = useRef<Status>('ready');

  const [status, setStatus] = useState<Status>('ready');
  const [score, setScore] = useState(0);
  const best = useSyncExternalStore(subscribeBest, getBest, () => 0);

  const updateStatus = useCallback((next: Status) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const token = (name: string) => styles.getPropertyValue(name).trim();

    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== SIZE * dpr) {
      canvas.width = SIZE * dpr;
      canvas.height = SIZE * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = token('--screenshot-fill');
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Food: an outlined square, so it reads apart from the snake.
    const food = foodRef.current;
    ctx.strokeStyle = token('--ink');
    ctx.lineWidth = 2;
    ctx.strokeRect(food.x * CELL + 5, food.y * CELL + 5, CELL - 10, CELL - 10);

    snakeRef.current.forEach((p, i) => {
      ctx.fillStyle = i === 0 ? token('--ink') : token('--body-secondary');
      ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const reset = useCallback(() => {
    snakeRef.current = startingSnake();
    dirRef.current = { x: 1, y: 0 };
    queueRef.current = [];
    foodRef.current = randomFood(snakeRef.current);
    setScore(0);
    draw();
  }, [draw]);

  const step = useCallback(() => {
    const queued = queueRef.current.shift();
    if (queued) dirRef.current = queued;
    const dir = dirRef.current;
    const snake = snakeRef.current;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    const ate = head.x === foodRef.current.x && head.y === foodRef.current.y;
    // The tail moves away this tick unless the snake eats, so it is not a collision.
    const body = ate ? snake : snake.slice(0, -1);
    const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
    const hitSelf = body.some((p) => p.x === head.x && p.y === head.y);

    if (hitWall || hitSelf) {
      updateStatus('over');
      draw();
      return;
    }

    snakeRef.current = [head, ...body];
    if (ate) {
      const nextScore = snakeRef.current.length - 3;
      setScore(nextScore);
      if (nextScore > getBest()) writeBest(nextScore);
      if (snakeRef.current.length === GRID * GRID) {
        updateStatus('won');
      } else {
        foodRef.current = randomFood(snakeRef.current);
      }
    }
    draw();
  }, [draw, updateStatus]);

  // Place the first food and draw the first frame.
  useEffect(() => {
    foodRef.current = randomFood(snakeRef.current);
    draw();
  }, [draw]);

  // Redraw when the theme changes, so the board picks up the new token colors.
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    draw();
  }, [draw, resolvedTheme]);

  // Game loop.
  useEffect(() => {
    if (status !== 'playing') return;
    const id = window.setInterval(step, TICK_MS);
    return () => window.clearInterval(id);
  }, [status, step]);

  // Keyboard controls.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const current = statusRef.current;

      if (key === ' ' || key === 'Enter') {
        e.preventDefault();
        if (current === 'playing') updateStatus('paused');
        else if (current === 'paused') updateStatus('playing');
        else {
          if (current === 'over' || current === 'won') reset();
          updateStatus('playing');
        }
        return;
      }

      const next = DIRECTIONS[key];
      if (!next) return;
      e.preventDefault();

      if (current === 'over' || current === 'won') {
        reset();
        updateStatus('playing');
      } else if (current !== 'playing') {
        updateStatus('playing');
      }

      // Compare against the last queued direction so two quick presses
      // cannot turn the snake back into itself within one tick.
      const queue = queueRef.current;
      const last = queue[queue.length - 1] ?? dirRef.current;
      const reverses = last.x + next.x === 0 && last.y + next.y === 0;
      const same = last.x === next.x && last.y === next.y;
      if (!reverses && !same && queue.length < 3) queue.push(next);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [reset, updateStatus]);

  const message: Record<Status, string> = {
    ready: 'Press an arrow key or WASD to start.',
    playing: 'Space to pause.',
    paused: 'Paused. Press Space to continue.',
    over: 'Game over. Press Space or a direction key to play again.',
    won: 'You filled the board. Press Space to play again.',
  };

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.08em] text-muted">
        <span>
          Score <span className="text-ink">{score}</span>
        </span>
        <span>
          Best <span className="text-ink">{best}</span>
        </span>
      </div>

      <canvas
        ref={canvasRef}
        className="block aspect-square w-full border border-hairline"
        role="img"
        aria-label={`Snake game board. Score ${score}.`}
      />

      <p className="mt-3 font-mono text-xs text-muted" aria-live="polite">
        {message[status]}
      </p>
    </div>
  );
}
