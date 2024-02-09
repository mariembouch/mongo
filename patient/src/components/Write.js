import React, { useState } from 'react';
import axios from "axios";

function Write() {
  const [patientData, setPatientData] = useState({
    prenom: "",
    nom: "",
    Email: "",
    CIN: "",
    Gender: "",
    valid:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const saveData = async () => {
    try {
      const dataToSend = { ...patientData, valid: 0 }; // Include valid field
      await axios.post("http://localhost:5000/writetodatabase", dataToSend);
      alert("Data saved successfully");
    } catch (error) {
      console.log("Error while saving data:", error.message);
    }
  };
  
  

  return (
    <div>
      <input type="text" name="prenom" placeholder="prenom" value={patientData.prenom} onChange={handleChange} />
      <input type="text" name="nom" placeholder="nom" value={patientData.nom} onChange={handleChange} />
      <input type="email" name="Email" placeholder="Email" value={patientData.Email} onChange={handleChange} />
      <input type="text" name="CIN" placeholder="CIN" value={patientData.CIN} onChange={handleChange} />
      <input type="text" name="Gender" placeholder="Gender" value={patientData.Gender} onChange={handleChange} />
      <button onClick={saveData}>Save data to MongoDB</button>
    </div>
  );
}

export default Write;
