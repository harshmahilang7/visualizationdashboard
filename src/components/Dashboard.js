/**
 * @Author: Dastan Alam
 * @Date:   2024-07-02 11:21:51 PM   23:07
 * @Last Modified by:   Dastan Alam
 * @Last Modified time: 2024-07-02 11:34:04 PM   23:07
 */
// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');  // Update URL as per your Flask server
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {/* Example rendering data */}
            <strong>Name:</strong> {item.name} <br />
            <strong>Email:</strong> {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
