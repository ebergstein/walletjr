var ChildWalletFactory = artifacts.require("./ChildWalletFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(ChildWalletFactory);
};
