import { URL } from 'url';
import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/log', (req, res) => {
  const data = fs.readFileSync(new URL('../job_log.json', import.meta.url), 'utf-8');
  res.json(JSON.parse(data));
});

export default router;
