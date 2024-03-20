# Lorem Ipsum Slicer (LIS)
This project implements a smart contract, leveraging the Ownable.sol contract from OpenZeppelin, that manages an array of strings ("Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, sed, do"). It allows users to retrieve specific slices of the array through a user-friendly interface while maintaining control and security.

# Key Features
Ownable Contract: Inherits from OpenZeppelin's Ownable.sol to ensure only the contract owner can modify the number variable controlling the returned array slice.
Payable Functions:
firstNumElements: Returns the first num elements of the array for a fee of 0.001 ETH.
lastNumElements: Returns the elements from index num to the end of the array for a fee of 0.002 ETH.
Restricted Number Update: Only the contract owner can update the num variable, controlling the returned slice size.
Secure Funds Transfer: Contract owner can withdraw all funds accumulated through function calls.
User-Friendly Interface: Provides a front-end interface for easy interaction.

# Features of the Front-End
Displays Contract Information: Shows the address of the contract owner, your address and ETH balance.
Tracks Current Slice Size: Displays the current value of the num variable, indicating the size of the returned array slice.
Retrieves Array Slices: Offers buttons to trigger the firstNumElements and lastNumElements functions, allowing users to retrieve specific array slices based on their choice.
Updates Slice Size: Provides an input field and a button to call the setNumber function. This allows the contract owner (if it's you) to modify the num variable, thereby controlling the size of the returned slices.
Withdraw Funds: If you're the contract owner, a button is available to call the function that securely transfers all accumulated funds to your wallet.

# Usage
### Deployment:
Run the provided setup.sh script.

Include import "@openzeppelin/contracts/access/Ownable.sol"; in your Counter.sol file.

Deploy the contract using Foundry with the following command (replace <deployer_account_address> and <private_key>):

```bash
forge create --rpc-url http://127.0.0.1:8545 --private-key <private_key> --constructor-args <deployer_account_address> src/Counter.sol:Counter
Use code with caution.
```

### Interaction:
Open the front-end interface (details on how to access it will depend on your specific implementation).
The interface will display the contract owner's address, your address and ETH balance, and the current num value.
To retrieve a slice of the array, choose between the "Get First Elements" and "Get Last Elements" buttons based on your desired portion.
If you're the contract owner, you can modify the num variable using the input field and the "Set Number" button. This will adjust the size of the returned array slice for future retrievals.
If you're the contract owner and want to withdraw accumulated funds, click the "Withdraw Funds" button.
Note: Remember to connect your wallet to the front-end interface to interact with the smart contract functions.
 
# References
OpenZeppelin Ownable: https://docs.openzeppelin.com/contracts/4.x/access-control
Payable Functions:
https://docs.alchemy.com/docs/solidity-payable-functions
https://solidity-by-example.org/payable/

