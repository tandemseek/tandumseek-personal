import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function KeywordManager() {
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    const res = await axios.get('http://localhost:5000/api/keywords');
    setKeywords(res.data);
  };

  const saveKeywords = async () => {
    await axios.post('http://localhost:5000/api/keywords', keywords);
    alert("Keywords saved!");
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (word) => {
    setKeywords(keywords.filter(k => k !== word));
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Keyword Manager</h2>
      <input
        type="text"
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        placeholder="Add new keyword"
      />
      <button onClick={addKeyword}>Add</button>
      <ul>
        {keywords.map((k, i) => (
          <li key={i}>
            {k} <button onClick={() => removeKeyword(k)}>X</button>
          </li>
        ))}
      </ul>
      <button onClick={saveKeywords}>Save All</button>
    </div>
  );
}
