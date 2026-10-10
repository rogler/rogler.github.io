// Runs before dev/generate. Fails fast if:
//  1. a YAML file does not match the Zod schema (shared/schema.ts), or
//  2. resume.en.yaml and resume.fr.yaml drift apart (keys, list lengths, ids).
import fs from 'node:fs';
import yaml from 'js-yaml';
import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);
const { resumeSchema } = await jiti.import('../shared/schema.ts');

const LANGS = ['en', 'fr'];
const load = (l) => yaml.load(fs.readFileSync(`content/resume.${l}.yaml`, 'utf8'), { schema: yaml.JSON_SCHEMA });
const data = Object.fromEntries(LANGS.map((l) => [l, load(l)]));
const problems = [];

for (const l of LANGS) {
  const parsed = resumeSchema.safeParse(data[l]);
  if (!parsed.success) {
    for (const i of parsed.error.issues) problems.push(`resume.${l}.yaml: ${i.path.join('.')}: ${i.message}`);
  }
}

function compare(a, b, path = '') {
  if (Array.isArray(a) !== Array.isArray(b) || (a === null) !== (b === null)) return problems.push(`${path}: different type`);
  if (Array.isArray(a)) {
    if (a.length !== b.length) problems.push(`${path}: ${a.length} items in ${LANGS[0]}, ${b.length} in ${LANGS[1]}`);
    a.forEach((x, i) => b[i] !== undefined && compare(x, b[i], `${path}[${i}]`));
  } else if (a && typeof a === 'object') {
    const ka = Object.keys(a), kb = Object.keys(b);
    for (const k of new Set([...ka, ...kb])) {
      if (!(k in a) || !(k in b)) problems.push(`${path}.${k}: only in ${k in a ? LANGS[0] : LANGS[1]}`);
      else compare(a[k], b[k], `${path}.${k}`);
    }
  }
}
compare(data.en, data.fr);

for (const key of ['experience', 'education', 'projects', 'skills']) {
  const ids = (l) => (data[l][key] ?? []).map((x) => x.id).join(',');
  if (ids('en') !== ids('fr')) problems.push(`${key}: ids differ between languages`);
}

if (problems.length) {
  console.error('Resume data problems:\n - ' + problems.join('\n - '));
  process.exit(1);
}
console.log('resume data: schema OK, EN and FR match');
