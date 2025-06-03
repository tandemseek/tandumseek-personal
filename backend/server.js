// backend/server.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { generateResumeAndCoverLetter } from './utils/openaiResumeGen.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve the resume config file
app.get('/api/resume', (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, 'resume_data.json'), 'utf-8');
  res.json(JSON.parse(data));
});

app.post('/api/apply', async (req, res) => {
  try {
    const result = await generateResumeAndCoverLetter(req.body);
    res.json(result);
  } catch (err) {
    console.error('Error generating content:', err);
    res.status(500).json({ error: 'Failed to generate resume or cover letter.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
