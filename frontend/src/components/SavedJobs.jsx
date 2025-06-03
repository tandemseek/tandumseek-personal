import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SavedJobs({ onApply }) {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    const res = await axios.get('/api/saved');
    setSavedJobs(res.data);
  };

  const apply = async (job) => {
    const res = await axios.post('/api/apply', job);
    await axios.post('/api/unsave', job);
    setSavedJobs(savedJobs.filter(j => j.url !== job.url));
    onApply(job.url);
  };

  const unsave = async (job) => {
    await axios.post('/api/unsave', job);
    setSavedJobs(savedJobs.filter(j => j.url !== job.url));
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Saved Jobs</h2>
      {savedJobs.map((job, idx) => (
        <div key={idx} style={{ border: '1px dashed gray', padding: 10, marginBottom: 10 }}>
          <strong>{job.title}</strong> at {job.company}<br />
          <button onClick={() => apply(job)}>Apply</button>
          <button onClick={() => unsave(job)}>Unsave</button>
        </div>
      ))}
    </div>
  );
}
