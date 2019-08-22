var vote = artifacts.require("./vote.sol");

module.exports = function(deployer) {
  deployer.deploy(vote);
};