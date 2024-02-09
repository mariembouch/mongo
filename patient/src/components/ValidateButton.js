import React from 'react';
import axios from 'axios';
import { loadBlockchainData } from '../Web3'; // Assuming loadBlockchainData is exported from Web3.js

function ValidateButton({ patients }) {
  const handleValidationAll = async () => {
    try {
      const patientsToValidate = patients.filter(patient => patient.valid === 0);
      const { valid, accounts } = await loadBlockchainData();

      patientsToValidate.forEach(async (patient) => {
        try {
          await valid.methods
            .addPatient(patient._id, patient.prenom, patient.nom)
            .send({ from: accounts });
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
