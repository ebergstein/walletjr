pragma solidity ^0.4.23;

contract ChildWalletFactory {
    function newChildWallet(address childAddress) public returns (address) {
        return new ChildWallet(childAddress);
    }
}

contract ChildWallet {
    address childAddress;
    address parentAddress;
    //event WrongAddress(sender); // TODO

    uint transactionLimit;
    // TODO
    uint timeInterval;
    uint timedTransactionLimit;
    //address[] whitelistedAddresses;

    function ChildWallet(address _childAddress) public payable {
        //TODO: handle rules setup in constructor. Was having trouble deploying with constructor args.
        require(msg.value > 0, "The child wallet must be funded with some amount. This amount can only be spent by the rules you set!");
        require(_childAddress != msg.sender, "The child must have a different address from the parent.");

        parentAddress = msg.sender;
        childAddress = _childAddress;
        transactionLimit = 0;
        timeInterval = 0;
        timedTransactionLimit = 0;
    }

    function () public payable {} // This contract can accept further payments.

    function requestFunds(address _recipient, uint32 _amount) public {
        require(msg.sender == childAddress || msg.sender == parentAddress, "Only the child (or parent) may request funds from the parent.");
        require(transactionLimit != 0 || (timeInterval != 0 && timedTransactionLimit != 0), "Rules have not yet been set up for this account.");
        require(_amount <= address(this).balance, "Tried to spend more money than available!");
        
        if (transactionLimit != 0) {
            require(_amount <= transactionLimit, "You tried to spend more than your parent allows for a single transaction.");
        }

        // TODO: time limiting

        _recipient.transfer(_amount);
    }

    function amountPerTransactionRule(uint _transactionLimit) public {
        require(msg.sender == parentAddress, "Only the parent who set up the rules may change them. Are you using the same address?");
        transactionLimit = _transactionLimit;
    }

    function changeChildAddress(address newChildAddress) public {
        require(msg.sender == parentAddress, "Only the parent may do this. Did you set up the contract with the same account?");
        require(newChildAddress != msg.sender, "The child must have a different address from the parent.");
        childAddress = newChildAddress;
    }
}