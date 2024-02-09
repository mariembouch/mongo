const handleValidationAll = async () => {
    try {
      // Filter patients with valid === 0
      const patientsToValidate = patients.filter(patient => patient.valid === 0);
      
      // Load blockchain data to get contract instance and accounts
      const { valid, accounts } = await loadBlockchainData();
  
      // Iterate over filtered patients and add each one to the blockchain
      patientsToValidate.forEach(async (patient) => {
        try {
          await valid.methods
            .addPatient(patient._id, patient.prenom, patient.nom)
            .send({ from: accounts });
        } catch (error) {
          alert(error.message);
        }
      });
  
      // Update the validity of all patients in the database
      await axios.put(`http://localhost:5000/validate/all`);
  
      alert('All patients validated successfully!');
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error while validating all patients:', error);
    }
  };
  
  return (
    <div>
      <button onClick={handleValidationAll}>Valider tous les patients</button>
    </div>
  );
  