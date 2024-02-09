const ValidatePatient = artifacts.require("ValidatePatient");

module.exports = function(deployer) {
  deployer.deploy(ValidatePatient);
};
