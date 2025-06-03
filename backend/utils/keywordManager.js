import { URL } from 'url';
import fs from 'fs';

const filePath = new URL('../keywords.json', import.meta.url);

export function getKeywords() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function saveKeywords(keywords) {
  fs.writeFileSync(filePath, JSON.stringify(keywords, null, 2));
}
