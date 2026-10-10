// Renders /<lang>/print/ from the generated site (.output/public) into resume-<lang>.pdf.
// Run after `nuxt generate`. Needs: npx playwright install chromium
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve('.output/public');
const BASE = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');
const LANGS = ['en', 'fr'];
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff', '.svg': 'image/svg+xml',
};

const server = http.createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!url.startsWith(BASE)) throw new Error('outside base');
    let file = path.join(ROOT, url.slice(BASE.length));
    if (!file.startsWith(ROOT)) throw new Error('outside root');
    if ((await fs.stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
    res.end(await fs.readFile(file));
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise((resolve) => server.listen(0, resolve));
const { port } = server.address();

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const lang of LANGS) {
    await page.goto(`http://localhost:${port}${BASE}${lang}/print/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(ROOT, `resume-${lang}.pdf`);
    await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log('wrote', path.relative(process.cwd(), out));
  }
} finally {
  await browser.close();
  server.close();
}
