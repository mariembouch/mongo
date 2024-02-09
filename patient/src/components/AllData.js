import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllData() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/alldata');
        setAllData(response.data);
      } catch (error) {
        console.error('Error fetching all data:', error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div>
      <h2>All Data:</h2>
      <ul>
        {allData.map((data, index) => (
          <li key={index}>{data.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllData;
