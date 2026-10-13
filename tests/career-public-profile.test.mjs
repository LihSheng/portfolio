import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validatePublicProfile, checkCareerFiles } from '../scripts/check-career-public-data.mjs';

const publicProfile = JSON.parse(readFileSync(new URL('../content/data/profile.public.json', import.meta.url), 'utf8'));

test('public profile matches supported contract', () => {
  assert.equal(validatePublicProfile(publicProfile), true);
  assert.equal(checkCareerFiles(process.cwd()), true);
});

test('unknown fields fail closed', () => {
  assert.throws(() => validatePublicProfile({ ...publicProfile, phone: '123' }), /Unexpected/);
  assert.throws(() => validatePublicProfile({ ...publicProfile, secret: 'private' }), /Unexpected/);
});

test('required fields and URLs are valid', () => {
  assert.throws(() => validatePublicProfile({ ...publicProfile, bio: '' }), /Missing/);
  assert.throws(() => validatePublicProfile({ ...publicProfile, website: 'http://unsafe.test' }), /HTTPS/);
});
