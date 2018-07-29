# To use test SimpleContract

Navigate to project directory and run 
`truffle migrate --network ganache`

This publishes the contract to your local in-memory blockchain instance.

To work with the contract, first get an instance:
`SimpleContract.deployed().then(function(instance){simpleContract = instance})`

Once you have that, you can access its methods. This is a view function and is free to run:

`simpleContract.getMessage();`

Or, you can spend money to change the message:

`simpleContract.sendMessage('new message', {from: web3.eth.accounts[4]});`

This will spend money from account 4 to change the state.