import assert from 'node:assert/strict';
import test from 'node:test';
import { armLength, clampReach, lerpAngle, solveElbow } from '../../lib/pointing-hand/geometry.ts';

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

test('lerpAngle takes the short way across the -PI/PI seam', () => {
  const mid = lerpAngle(Math.PI - 0.1, -Math.PI + 0.1, 0.5);
  assert.ok(Math.abs(Math.abs(mid) - Math.PI) < 1e-9);
});

test('armLength stays within its bounds', () => {
  assert.equal(armLength(100, 100), 180);
  assert.equal(armLength(5000, 3000), 480);
  assert.ok(Math.abs(armLength(1280, 800) - Math.hypot(1280, 800) * 0.3) < 1e-9);
});

test('clampReach pulls a far target in to the arm length', () => {
  const shoulder = { x: 0, y: 0 };
  const wrist = clampReach(shoulder, { x: -2000, y: 0 }, 300);
  assert.equal(wrist.y, 0);
  assert.equal(dist(shoulder, wrist), 599);
});

test('clampReach keeps a target that is already within reach', () => {
  const target = { x: -300, y: -200 };
  assert.deepEqual(clampReach({ x: 0, y: 0 }, target, 300), target);
});

test('solveElbow gives bones of equal length that meet at the wrist', () => {
  const shoulder = { x: 1152, y: 850 };
  const wrist = { x: 700, y: 400 };
  const elbow = solveElbow(shoulder, wrist, 450);
  assert.ok(Math.abs(dist(shoulder, elbow) - 450) < 1e-6);
  assert.ok(Math.abs(dist(elbow, wrist) - 450) < 1e-6);
});

test('solveElbow bends the arm out to the right', () => {
  const shoulder = { x: 1000, y: 900 };
  const wrist = { x: 600, y: 500 };
  const elbow = solveElbow(shoulder, wrist, 400);
  assert.ok(elbow.x > (shoulder.x + wrist.x) / 2);
});
