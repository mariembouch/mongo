import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadBlockchainData } from '../Web3'; // Assuming loadBlockchainData is exported from Web3.js

function ValidateButton() {
  const [patientsToValidate, setPatientsToValidate] = useState([]);

  useEffect(() => {
    const fetchNonValidatedPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/alldata');
        setPatientsToValidate(response.data);
      } catch (error) {
        console.error('Error fetching non-validated patients:', error);
      }
    };

    fetchNonValidatedPatients();
  }, []);

  const handleValidationAll = async () => {
    try {
      const { valid, accounts } = await loadBlockchainData();

      patientsToValidate.forEach(async (patient) => {
        try {
          await valid.methods
            .addPatient(patient._id, patient.prenom, patient.nom, [], { from: accounts });
        } catch (error) {
          alert(error.message);
        }
      });

      await axios.put(`http://localhost:5000/validate/all`);

      alert('All patients validated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error while validating all patients:', error);
    }
  };

  return (
    <div>
      <button onClick={handleValidationAll}>Valider tous les patients</button>
    </div>
  );
}

export default ValidateButton;
