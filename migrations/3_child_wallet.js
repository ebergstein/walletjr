var ChildWallet = artifacts.require("./ChildWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(ChildWallet);
};
