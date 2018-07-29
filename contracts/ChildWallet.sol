pragma solidity ^0.4.18;

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
        require(msg.value > 0, "The child wallet must be funded with some amount. This amount can only be spent by the rules you set!");
        require(_childAddress != msg.sender, "The child must have a different address from the parent.");

        parentAddress = msg.sender;
        childAddress = _childAddress;
    }

    function () public payable {} // This contract can accept further payments.

    function requestFunds(address recipient, uint32 amount) public {
        require(msg.sender == childAddress, "Only the specified child wallet may request funds from the parent.");
        require(transactionLimit != 0 || (timeInterval != 0 && timedTransactionLimit != 0), "Rules have not yet been set up for this account.");
        require(amount <= address(this).balance, "Tried to spend more money than available!");
        
        if (transactionLimit != 0) {
            require(amount <= transactionLimit, "You tried to spend more than your parent allows for a single transaction.");
        }

        // TODO: time limiting

        recipient.transfer(amount);
    }

    function amountPerTransactionRule(uint _transactionLimit) public {
        require(msg.sender == parentAddress, "Only the parent who set up the rules may change them. Are you using the same address?");
        transactionLimit = _transactionLimit;
    }

    function changeChildAddress(address newChildAddress) public{
        require(msg.sender == parentAddress, "Only the parent may do this. Did you set up the contract with the same account?");
        childAddress = newChildAddress;
    }
}