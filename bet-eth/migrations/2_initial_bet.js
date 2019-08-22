const bet = artifacts.require("Betting");

module.exports = function(deployer) {
  deployer.deploy(bet);
};
