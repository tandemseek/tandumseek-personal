import express from 'express';
import fs from 'fs';
const router = express.Router();

const filePath = './backend/job_saved.json';

router.get('/saved', (req, res) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  res.json(JSON.parse(data));
});

router.post('/save', (req, res) => {
  const job = req.body;
  const jobs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!jobs.find(j => j.url === job.url)) {
    jobs.push({ ...job, date: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
  }
  res.json({ message: "Job saved" });
});

router.post('/unsave', (req, res) => {
  const job = req.body;
  let jobs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  jobs = jobs.filter(j => j.url !== job.url);
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
  res.json({ message: "Job unsaved" });
});

export default router;
