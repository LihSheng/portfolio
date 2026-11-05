/**
 * Pure geometry for the pointing hand on the home page (components/pointing-hand).
 * Kept free of DOM and canvas APIs so it can be unit tested with node:test.
 */

export interface Point {
  x: number;
  y: number;
}

/** Shortest-path interpolation between two angles in radians. */
export function lerpAngle(from: number, to: number, k: number): number {
  let d = to - from;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return from + d * k;
}

/** Frame-rate independent smoothing factor for exponential easing. */
export function smoothing(dtSeconds: number, rate: number): number {
  return 1 - Math.exp(-dtSeconds * rate);
}

/** Length of each arm bone for a viewport, clamped so the arm stays drawable on phones and large screens. */
export function armLength(viewportWidth: number, viewportHeight: number): number {
  return Math.min(Math.max(Math.hypot(viewportWidth, viewportHeight) * 0.3, 180), 480);
}

/** Where the shoulder sits: just below the bottom edge, near the right side. */
export function shoulderFor(viewportWidth: number, viewportHeight: number): Point {
  return { x: viewportWidth * 0.9, y: viewportHeight + 50 };
}

const MIN_REACH = 40;

/**
 * Keep a wrist target within reach of a two-bone arm whose bones are both `length` long.
 * Targets that are too far are pulled in along the shoulder-target line; targets too close are pushed out.
 */
export function clampReach(shoulder: Point, target: Point, length: number): Point {
  const dx = target.x - shoulder.x;
  const dy = target.y - shoulder.y;
  const d = Math.hypot(dx, dy);
  const max = 2 * length - 1;
  if (d > max) return { x: shoulder.x + (dx / d) * max, y: shoulder.y + (dy / d) * max };
  if (d < MIN_REACH) {
    const ux = d === 0 ? -1 : dx / d;
    const uy = d === 0 ? 0 : dy / d;
    return { x: shoulder.x + ux * MIN_REACH, y: shoulder.y + uy * MIN_REACH };
  }
  return target;
}

/**
 * Two-bone inverse kinematics with equal bone lengths.
 * Returns the elbow for a wrist that is already within reach (see clampReach).
 * Of the two solutions, the elbow further to the right is used, so the arm bends
 * out towards the screen edge instead of across the page.
 */
export function solveElbow(shoulder: Point, wrist: Point, length: number): Point {
  const dx = wrist.x - shoulder.x;
  const dy = wrist.y - shoulder.y;
  const d = Math.min(Math.max(Math.hypot(dx, dy), MIN_REACH), 2 * length - 1);
  const base = Math.atan2(dy, dx);
  const offset = Math.acos(Math.min(1, d / (2 * length)));
  const a = { x: shoulder.x + Math.cos(base + offset) * length, y: shoulder.y + Math.sin(base + offset) * length };
  const b = { x: shoulder.x + Math.cos(base - offset) * length, y: shoulder.y + Math.sin(base - offset) * length };
  return a.x > b.x ? a : b;
}
