
import Web3 from "web3";
import valid from "./contracts/ValidatePatient.json";

export const loadWeb3 = async () => {
    if (window.ethereum) {
      console.log('MetaMask detected');
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Accounts accessed successfully');
      } catch (error) {
        console.error('Error requesting accounts:', error);
      }
    } else {
      console.error('MetaMask not detected. Please install MetaMask extension.');
    }
};

export const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    
    // Network ID
    const networkId = await web3.eth.net.getId();
    
    // Network data
    if (networkId) {
        const validContract = new web3.eth.Contract(
            valid.abi,
            valid.networks[networkId].address
        );
        return { valid: validContract, accounts: accounts[0] };
    }
};
