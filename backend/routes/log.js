import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/log', (req, res) => {
  const data = fs.readFileSync('./backend/job_log.json', 'utf-8');
  res.json(JSON.parse(data));
});

export default router;
