import React, { useState } from 'react';
import axios from 'axios';

export default function JobCard({ job, onApply, onSkip }) {
  const [showJD, setShowJD] = useState(false);
  const [result, setResult] = useState({});
  const [editing, setEditing] = useState(false);
  const [tone, setTone] = useState('Professional');
  const [template, setTemplate] = useState('Classic');

  const apply = async () => {
    const res = await axios.post('http://localhost:5000/api/apply', { ...job, tone, template });
    setResult(res.data);
    setEditing(true);
    onApply(job.url);
  };

  
  const save = async () => {
    await axios.post('http://localhost:5000/api/save', job);
    alert("Job saved!");
  };

  const skip = async () => {
    await axios.post('http://localhost:5000/api/skip', job);
    onSkip(job.url);
  };

  const downloadText = (text, filename) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  
  const downloadPDF = async (text, filename) => {
    const res = await axios.post('http://localhost:5000/api/export/pdf', { content: text, filename }, { responseType: 'blob' });
    const blob = new Blob([res.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
      <strong>{job.title}</strong> at {job.company} ({job.location})<br />
      <button onClick={apply}>Apply</button>
      <button onClick={skip}>Skip</button> <button onClick={save}>Save</button>
      <button onClick={() => setShowJD(!showJD)}>Toggle JD</button>
      <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ marginLeft: 10 }}>
        <option>Professional</option>
        <option>Friendly</option>
        <option>Minimalist</option>
        <option>Technical</option>
      </select>
      <select value={template} onChange={(e) => setTemplate(e.target.value)} style={{ marginLeft: 10 }}>
        <option>Classic</option>
        <option>Modern</option>
        <option>Technical</option>
        <option>Minimalist</option>
      </select>

      {showJD && (
        <div style={{ marginTop: 10, whiteSpace: 'pre-wrap' }}>
          <strong>Job Description:</strong><br />
          {job.description}
        </div>
      )}

      {result.resume && editing && (
        <div>
          <h3>Resume</h3>
          <div contentEditable suppressContentEditableWarning={true} style={{ border: '1px solid #ddd', padding: 10 }}>{result.resume}</div>
          <button onClick={() => downloadText(result.resume, 'resume.txt')}>Download Resume</button>
          <button onClick={() => copyToClipboard(result.resume)}>Copy Resume</button> <button onClick={() => downloadPDF(result.resume, "resume.pdf")}>PDF</button>

          <h3>Cover Letter</h3>
          <div contentEditable suppressContentEditableWarning={true} style={{ border: '1px solid #ddd', padding: 10 }}>{result.coverLetter}</div>
          <button onClick={() => downloadText(result.coverLetter, 'cover_letter.txt')}>Download Cover Letter</button>
          <button onClick={() => copyToClipboard(result.coverLetter)}>Copy Cover Letter</button> <button onClick={() => downloadPDF(result.coverLetter, "cover_letter.pdf")}>PDF</button>
        </div>
      )}
    </div>
  );
}
