// Validate the public-only career export before accepting any future sync PR.
// Private source YAML, full resumes and credentials must never enter this repository.
import fs from 'node:fs';
import path from 'node:path';

export const allowedKeys = new Set(['name', 'headline', 'bio', 'website', 'github', 'linkedin']);

export function validatePublicProfile(profile) {
  if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
    throw new Error('Public profile must be a JSON object');
  }
  for (const key of Object.keys(profile)) {
    if (!allowedKeys.has(key)) throw new Error('Unexpected public profile key: ' + key);
  }
  for (const key of allowedKeys) {
    if (typeof profile[key] !== 'string' || !profile[key].trim()) {
      throw new Error('Missing or invalid public profile field: ' + key);
    }
  }
  for (const key of ['website', 'github', 'linkedin']) {
    const parsed = new URL(profile[key]);
    if (parsed.protocol !== 'https:') throw new Error(key + ' must use HTTPS');
  }
  if (/\b(?:TODO|TBD|FIXME)\b/i.test(JSON.stringify(profile))) {
    throw new Error('Unresolved placeholder in public profile');
  }
  return true;
}

export function checkCareerFiles(root) {
  const profilePath = path.join(root, 'content/data/profile.public.json');
  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  validatePublicProfile(profile);
  const tollgatePath = path.join(root, 'content/projects/tollgate.mdx');
  if (fs.existsSync(tollgatePath)) {
    const text = fs.readFileSync(tollgatePath, 'utf8');
    if (/^repoUrl:\s*\S+/m.test(text)) throw new Error('Tollgate private repo URL cannot be published');
  }
  return true;
}

if (process.argv[1] && import.meta.url === new URL('file://' + path.resolve(process.argv[1])).href) {
  try {
    checkCareerFiles(path.resolve(process.argv[2] || '.'));
    process.stdout.write('Public career content validation passed\n');
  } catch (error) {
    process.stderr.write('Public career content validation failed: ' + error.message + '\n');
    process.exitCode = 1;
  }
}
