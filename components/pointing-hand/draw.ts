import type { Point } from '@/lib/pointing-hand/geometry';

/**
 * Canvas drawing for the pointing hand: a printer's manicule with a lace cuff,
 * drawn as ink outlines filled with the paper colour.
 *
 * Hand coordinates are local to the wrist, with +x along the pointing finger.
 */

export interface HandColors {
  ink: string;
  paper: string;
  hatch: string;
}

/** The index fingertip, in local hand units (multiply by scale for pixels). */
export const FINGERTIP: Point = { x: 72, y: -9 };

type Segment = [x1: number, y1: number, x2: number, y2: number, width: number];

function strokeSegments(ctx: CanvasRenderingContext2D, segments: Segment[], extra: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const [x1, y1, x2, y2, w] of segments) {
    ctx.lineWidth = w + extra;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

/** Ink outline, then paper fill: overlapping capsules merge into one outlined shape. */
function inkShape(ctx: CanvasRenderingContext2D, colors: HandColors, segments: Segment[]) {
  strokeSegments(ctx, segments, 2.6, colors.ink);
  strokeSegments(ctx, segments, 0, colors.paper);
}

export function drawHand(
  ctx: CanvasRenderingContext2D,
  colors: HandColors,
  at: Point,
  angle: number,
  scale: number,
  flip: number,
  curl: number
) {
  ctx.save();
  ctx.translate(at.x, at.y);
  ctx.rotate(angle);
  ctx.scale(scale, scale * flip);

  // Curled fingers, back to front, so each keeps its own outline
  inkShape(ctx, colors, [[22, 14, 28, 15, 8.5]]);
  inkShape(ctx, colors, [[26, 8, 33, 9, 9.5]]);
  inkShape(ctx, colors, [[28, 1, 36 - curl, 2, 10]]);
  // Palm and index finger as one shape
  inkShape(ctx, colors, [
    [2, -1, 24, 2, 30],
    [26, -8, 67 - curl * 2, -9 + curl, 10],
  ]);
  // Thumb resting on the middle finger
  inkShape(ctx, colors, [[10, -11, 31, -4, 10.5]]);

  ctx.strokeStyle = colors.ink;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(64 - curl * 2, -9 + curl, 3, -1.2, 1.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(29, -4.5, 2.6, -1.3, 1.1);
  ctx.stroke();

  ctx.lineWidth = 1;
  for (const x of [45, 53]) {
    ctx.beginPath();
    ctx.moveTo(x, -12.5);
    ctx.lineTo(x, -10.5);
    ctx.stroke();
  }

  // Lace cuff with a scalloped edge and hatching
  ctx.beginPath();
  ctx.moveTo(-14, -19);
  ctx.lineTo(-1, -19);
  for (let i = 0; i < 6; i++) ctx.arc(-1, -19 + 3.17 * (2 * i + 1), 3.17, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(-14, 19);
  ctx.closePath();
  ctx.fillStyle = colors.paper;
  ctx.fill();
  ctx.lineWidth = 1.3;
  ctx.strokeStyle = colors.ink;
  ctx.stroke();
  ctx.strokeStyle = colors.hatch;
  ctx.lineWidth = 1;
  for (let x = -11; x <= -3; x += 2.7) {
    ctx.beginPath();
    ctx.moveTo(x, -16);
    ctx.lineTo(x, 16);
    ctx.stroke();
  }

  ctx.restore();
}

export function drawArm(
  ctx: CanvasRenderingContext2D,
  colors: HandColors,
  shoulder: Point,
  elbow: Point,
  wrist: Point,
  scale: number
) {
  inkShape(ctx, colors, [
    [shoulder.x, shoulder.y, elbow.x, elbow.y, 27 * scale],
    [elbow.x, elbow.y, wrist.x, wrist.y, 23 * scale],
  ]);

  // Sleeve folds near the elbow and the cuff
  ctx.strokeStyle = colors.hatch;
  ctx.lineWidth = 1;
  const fold = (a: Point, b: Point, t: number, len: number) => {
    const mx = a.x + (b.x - a.x) * t;
    const my = a.y + (b.y - a.y) * t;
    const normal = Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(mx - Math.cos(normal) * len, my - Math.sin(normal) * len);
    ctx.quadraticCurveTo(mx + 4, my + 4, mx + Math.cos(normal) * len * 0.6, my + Math.sin(normal) * len * 0.6);
    ctx.stroke();
  };
  fold(elbow, wrist, 0.12, 9 * scale);
  fold(elbow, wrist, 0.8, 8 * scale);
  fold(shoulder, elbow, 0.85, 10 * scale);
}
