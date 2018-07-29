pragma solidity ^0.4.18;

contract SimpleContract {
    string message;

    function SimpleContract() public {
        message = "Message initialized.";
    }

    function getMessage() public view returns (string) {
        return message;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}