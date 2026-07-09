/**
 * Verify indexed URLs still resolve correctly after CMS migration.
 *
 * Usage:
 *   node scripts/verify-seo-urls.mjs
 *   node scripts/verify-seo-urls.mjs --base http://localhost:3000
 *   node scripts/verify-seo-urls.mjs --csv scripts/seo/gsc-urls.csv --base https://ledtehnika.com
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function parseArgs(argv) {
  const args = {
    base: process.env.SEO_BASE_URL || 'http://localhost:3000',
    csv: path.join(__dirname, 'seo', 'gsc-urls.csv'),
  };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--base') args.base = argv[++i];
    if (argv[i] === '--csv') args.csv = argv[++i];
  }
  return args;
}

function parseCsvUrls(csvPath) {
  const raw = fs.readFileSync(csvPath, 'utf8');
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  const urls = [];
  for (const line of lines.slice(1)) {
    const cell = line.split(',')[0].trim();
    if (cell.startsWith('http')) urls.push(cell);
  }
  return [...new Set(urls)];
}

function toPath(url, baseOrigin) {
  const u = new URL(url);
  const base = new URL(baseOrigin);
  if (u.origin !== base.origin && u.hostname.replace(/^www\./, '') !== base.hostname.replace(/^www\./, '')) {
    return u.pathname + u.search;
  }
  return u.pathname + u.search;
}

async function checkUrl(base, pathname) {
  const target = new URL(pathname, base).toString();
  const res = await fetch(target, { redirect: 'manual' });
  const location = res.headers.get('location');
  return {
    status: res.status,
    location: location ? new URL(location, base).pathname : null,
    ok: res.status === 200 || res.status === 301 || res.status === 308,
  };
}

async function main() {
  const { base, csv } = parseArgs(process.argv);
  if (!fs.existsSync(csv)) {
    console.error(`CSV not found: ${csv}`);
    console.error('Export GSC pages to scripts/seo/gsc-urls.csv and re-run.');
    process.exit(1);
  }

  const urls = parseCsvUrls(csv);
  console.log(`Checking ${urls.length} URLs against ${base}\n`);

  const failures = [];
  const redirects = [];

  for (const url of urls) {
    const pathname = toPath(url, base);
    try {
      const result = await checkUrl(base, pathname);
      if (result.status === 301 || result.status === 308) {
        redirects.push({ url: pathname, to: result.location, status: result.status });
        console.log(`REDIRECT ${result.status} ${pathname} -> ${result.location}`);
      } else if (result.status === 200) {
        console.log(`OK       200 ${pathname}`);
      } else {
        failures.push({ url: pathname, status: result.status, location: result.location });
        console.log(`FAIL     ${result.status} ${pathname}`);
      }
    } catch (err) {
      failures.push({ url: pathname, error: err.message });
      console.log(`ERROR         ${pathname} (${err.message})`);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Total: ${urls.length}`);
  console.log(`Redirects (301/308): ${redirects.length}`);
  console.log(`Failures: ${failures.length}`);

  if (failures.length) {
    console.log('\nFailed URLs:');
    for (const f of failures) console.log(f);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
