const Multisig = artifacts.require("MultiSigWallet");

module.exports = function(deployer) {
  deployer.deploy(Multisig,["0x796E847c1464A03D79E48b955A8cA31cF9672469","0xc9038b17DAd22d6A372eb1671E9E414aC11E8C3B","0xE02a5376607a60122a879DABBF280fd455050f43"],2);
};
