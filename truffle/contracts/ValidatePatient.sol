// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ValidatePatient{
    uint256 public patientCount = 0;

    mapping(uint256 => Patient) public patientsList;

    struct Patient {
        string code;
        string name;
        uint256 temperature;
        bytes32[] hashList;
    }

    event PatientAdded(
        string code,
        string name,
        uint256 temperature,
        bytes32[] hashList
    );

    function addPatient(string memory _code, string memory _name, uint256 _temperature, bytes32[] memory _hashList) public {
        patientCount++;
        patientsList[patientCount] = Patient(_code, _name, _temperature, _hashList);
        emit PatientAdded(_code, _name, _temperature, _hashList); 
    }
}
