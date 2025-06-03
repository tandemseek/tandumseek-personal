import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TrackerView() {
  const [log, setLog] = useState([]);

  useEffect(() => {
    fetchLog();
  }, []);

  const fetchLog = async () => {
    const res = await axios.get('http://localhost:5000/api/log');
    setLog(res.data);
  };

  const exportLog = () => {
    const blob = new Blob([JSON.stringify(log, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job_log.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Application Tracker</h2>
      <button onClick={exportLog}>Export Log</button>
      <ul>
        {log.map((entry, idx) => (
          <li key={idx}>
            <strong>{entry.title}</strong> at {entry.company} - {entry.status} on {new Date(entry.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
