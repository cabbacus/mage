import fs from 'fs';
import path from 'path';

export function getPageData(slug) {
  const filePath = path.join(process.cwd(), `public/data/json/${slug}.json`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}
