import fs from 'fs';

const filePath = './backend/keywords.json';

export function getKeywords() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function saveKeywords(keywords) {
  fs.writeFileSync(filePath, JSON.stringify(keywords, null, 2));
}
