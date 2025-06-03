import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

export default function CalendarView() {
  const [log, setLog] = useState([]);
  const [saved, setSaved] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const resLog = await axios.get('/api/log');
    const resSaved = await axios.get('/api/saved');
    setLog(resLog.data);
    setSaved(resSaved.data);
  };

  const getJobsForDate = (date) => {
    const d = date.toISOString().split('T')[0];
    return [
      ...log.filter(j => j.date.startsWith(d)),
      ...saved.filter(j => j.date.startsWith(d))
    ];
  };

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const d = date.toISOString().split('T')[0];
    const applied = log.filter(j => j.date.startsWith(d)).length;
    const savedCount = saved.filter(j => j.date.startsWith(d)).length;

    return (
      <div>
        {applied > 0 && <span style={{ color: 'green' }}>✅</span>}
        {savedCount > 0 && <span style={{ color: 'blue' }}>📌</span>}
      </div>
    );
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Calendar View</h2>
      <Calendar
        onClickDay={(val) => setSelectedDate(val)}
        tileContent={tileContent}
      />
      {selectedDate && (
        <div style={{ marginTop: 20 }}>
          <h3>Jobs on {selectedDate.toDateString()}:</h3>
          <ul>
            {getJobsForDate(selectedDate).map((j, idx) => (
              <li key={idx}><strong>{j.title}</strong> at {j.company}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
