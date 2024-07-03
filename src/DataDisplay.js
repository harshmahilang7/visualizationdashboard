/**
 * @Author: Dastan Alam
 * @Date:   2024-07-03 12:06:15 AM   00:07
 * @Last Modified by:   Dastan Alam
 * @Last Modified time: 2024-07-03 12:06:17 AM   00:07
 */
// src/DataDisplay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from Flask backend
    axios.get('http://localhost:5001/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Data from MongoDB</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataDisplay;
