import React, { useState } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import KeywordManager from './KeywordManager';
import TrackerView from './TrackerView';
import CalendarView from './CalendarView';
import SavedJobs from './SavedJobs';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [tab, setTab] = useState('results');

  const fetchJobs = async () => {
    const res = await axios.get('/api/jobs');
    setJobs(res.data);
    setTab('results');
  };

  const handleApply = (url) => {
    setJobs(jobs.filter(j => j.url !== url));
  };

  const handleSkip = (url) => {
    setJobs(jobs.filter(j => j.url !== url));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>TandemBot Job Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={fetchJobs}>Run Daily Scrape</button> | 
        <button onClick={() => setTab('results')}>Job Results</button> | 
        <button onClick={() => setTab('saved')}>Saved Jobs</button> | 
        <button onClick={() => setTab('tracker')}>Application Tracker</button> | 
        <button onClick={() => setTab('keywords')}>Keyword Manager</button> | 
        <button onClick={() => setTab('calendar')}>Calendar View</button>
      </div>

      {tab === 'results' && (
        <div>
          {jobs.map((job, idx) => (
            <JobCard key={idx} job={job} onApply={handleApply} onSkip={handleSkip} />
          ))}
        </div>
      )}

      {tab === 'saved' && <SavedJobs onApply={handleApply} />}
      {tab === 'tracker' && <TrackerView />}
      {tab === 'keywords' && <KeywordManager />}
      {tab === 'calendar' && <CalendarView />}
    </div>
  );
}
