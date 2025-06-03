import fs from 'fs';
import fetch from 'node-fetch';

export async function generateResumeAndCoverLetter(job) {
  const resumeData = JSON.parse(fs.readFileSync('./backend/resume_data.json', 'utf-8'));
  const tone = job.tone || "Professional";
  const template = job.template || "Classic";

  const prompt = `You are an expert career assistant. Generate a resume and a cover letter tailored to the job description below. Use a ${tone.toLowerCase()} tone and a ${template.toLowerCase()} format.

Resume of user:
Name: ${resumeData.name}
Location: ${resumeData.location}
Email: ${resumeData.email}
Phone: ${resumeData.phone}
Skills: ${resumeData.skills.join(', ')}
Summary: ${resumeData.summary}

Job to target:
Title: ${job.title}
Company: ${job.company}
Location: ${job.location}
Description: ${job.description}

Output format:
--- RESUME ---
[resume content]

--- COVER LETTER ---
[cover letter content]`;

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gemma2:9b',
      prompt: prompt,
      stream: false
    })
  });

  const result = await response.json();
  const output = result.response || '';
  const parts = output.split(/--- RESUME ---|--- COVER LETTER ---/g);

  return {
    resume: parts[1]?.trim() || '',
    coverLetter: parts[2]?.trim() || ''
  };
}
