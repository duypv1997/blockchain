var WalletSimple = artifacts.require("./WalletSimple.sol");


module.exports = function(deployer) {
 deployer.deploy(WalletSimple,['0xd21834946cd69af9c0d95a9751938966d3857010','0xaee8236ed9b8754091e7c9e60785e0e1ef2dac1b','0xc6487be876348927259e0a2a9958ae7dc3234532']);
};
