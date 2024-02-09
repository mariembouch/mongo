import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Read() {
  const [serverData, setServerData] = useState(""); // Initialize serverData with an empty string

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/readfromserver");
        const dataFromServer = response.data.message; // Extract the data from the response
        setServerData(dataFromServer); // Update the state with the data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {serverData}
    </div>
  );
}

export default Read;