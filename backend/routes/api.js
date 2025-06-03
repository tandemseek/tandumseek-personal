import express from 'express';
import { fetchJobs } from '../utils/jobFetcher.js';
import { generateResumeAndCoverLetter } from '../utils/openaiResumeGen.js';
import fs from 'fs';
import { getKeywords, saveKeywords } from '../utils/keywordManager.js';

const router = express.Router();
const logPath = './backend/job_log.json';

router.get('/jobs', async (req, res) => {
  const keywords = getKeywords();
  const jobs = await fetchJobs(keywords);
  const jobLog = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
  const newJobs = jobs.filter(job => !jobLog.find(entry => entry.url === job.url));
  res.json(newJobs);
});

router.post('/apply', async (req, res) => {
  const job = req.body;
  const { resume, coverLetter } = await generateResumeAndCoverLetter(job);
  const jobLog = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
  jobLog.push({ ...job, status: "applied", date: new Date().toISOString() });
  fs.writeFileSync(logPath, JSON.stringify(jobLog, null, 2));
  res.json({ resume, coverLetter });
});

router.post('/skip', (req, res) => {
  const job = req.body;
  const jobLog = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
  jobLog.push({ ...job, status: "skipped", date: new Date().toISOString() });
  fs.writeFileSync(logPath, JSON.stringify(jobLog, null, 2));
  res.json({ message: "Job marked as skipped" });
});

router.get('/keywords', (req, res) => {
  const keywords = getKeywords();
  res.json(keywords);
});

router.post('/keywords', (req, res) => {
  const { keywords } = req.body;
  saveKeywords(keywords);
  res.json({ message: "Keywords updated." });
});

export default router;
