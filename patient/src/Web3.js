import React, { useState, useEffect } from "react";

import Web3 from "web3";

import Auth from "./contracts/ValidatePatient.json";

export const loadWeb3 = async () => {
if (window.ethereum) {
	window.web3 = new Web3(window.ethereum);
	await window.ethereum.enable();
} else if (window.web3) {
	window.web3 = new Web3(window.web3.currentProvider);
} else {
	window.alert(
	"Non-Ethereum browser detected. You should consider trying MetaMask!"
	);
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
	const auth = new web3.eth.Contract(
	Auth.abi,
	Auth.networks[networkId].address
	);
	return { auth, accounts: accounts[0] };
}
};// Web3Helpers.js
export const useWeb3 = () => {
  const [web3Data, setWeb3Data] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeb3Data = async () => {
      try {
        const data = await loadBlockchainData();
        console.log(data); // Log data to see the structure

        setWeb3Data(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadWeb3Data();
  }, []);

  return { web3Data, loading };
};