import React from 'react';
import axios from 'axios';
import Web3 from 'web3';

function ValidateButton({ patients }) {
  const handleValidationAll = async () => {
    try {
      // Set valid to 1 in MongoDB for all patients
      await axios.put('http://localhost:5000/validate/all');
      
      // Connect to MetaMask's injected Web3 instance
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request account access from MetaMask
        const accounts = await web3.eth.getAccounts();
        
        // Replace with your actual contract ABI and address
        const contractABI = [ /* Your contract ABI here */ ];
        const contractAddress = '0xD5c94505954A1F1828B7dC0205f7c56721A32fdb';
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Iterate over the patients array and add each patient to the blockchain
        patients.forEach(async (patient) => {
          const { _id, prenom, nom } = patient;
          await addPatientToBlockchain(contract, _id, prenom, nom, accounts[0]); // Pass the account address
        });
        
        alert('All patients validated successfully and added to the blockchain!');
      } else {
        console.error('MetaMask not detected!');
      }
    } catch (error) {
      console.error('Error while validating all patients and adding to blockchain:', error);
    }
  };

  const addPatientToBlockchain = async (contract, id, firstName, lastName, account) => {
    try {
      const name = `${firstName} ${lastName}`;
      // Call the addPatient function in the Auth smart contract
      const response = await contract.methods.addPatient(id, name, 0, []).send({ from: account });
      console.log(response);
    } catch (error) {
      console.error('Error while adding patient to blockchain:', error);
    }
  };

  return (
    <div>
      <button onClick={handleValidationAll}>Valider tous les patients</button>
    </div>
  );
}

export default ValidateButton;
