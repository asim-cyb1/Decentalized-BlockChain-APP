// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Counter is Ownable {
    // State variables
    uint256 public num;
    string[] public loremIpsum = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do"];
    // Constructor that calls the constructor of the Ownable contract with the specified initialOwner address
    constructor() Ownable(address(0xB6c7bE25b152E795732C2425a4709b47bAcC129A)) {
        // Set an initial value for num
        num = 0;
    }


    // Function to get the current value of 'num'
    function getNum() public view returns (uint256) {
        return num;
    }

    // Function to set the value of 'num' (users pay gas fees for this operation)
    function setNum(uint256 _newNum) public onlyOwner {
        num = _newNum;
    }

    // Function to get a sliced portion of the "lorem ipsum" array based on 'num'
    function getSlicedLoremIpsum() public view returns (string[] memory) {
        require(num <= loremIpsum.length);
        string[] memory slicedArray = new string[](num);
        for (uint256 i = 0; i < num; i++) {
            slicedArray[i] = loremIpsum[i];
        }
        return slicedArray;
    }

    // Function to get the first 'num' elements of the array, payable at 0.001 ETH
    function firstNumElements() public payable returns (string[] memory) {
        require(msg.value >= 0.001 ether, "Insufficient funds.");
        return getSlicedLoremIpsum();
    }

    // Function to get the last 'num' elements of the array, payable at 0.002 ETH
    function lastNumElements() public payable returns (string[] memory) {
        require(msg.value >= 0.002 ether, "Insufficient funds.");
        require(num <= loremIpsum.length);
        string[] memory slicedArray = new string[](loremIpsum.length - num);
        uint256 index = 0;
        for (uint256 i = num; i < loremIpsum.length; i++) {
            slicedArray[index] = loremIpsum[i];
            index++;
        }
        return slicedArray;
    }

    // Function to transfer all the funds from the contract to the owner, only callable by the owner
    function transferFundsToOwner() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract has no balance.");
        payable(owner()).transfer(contractBalance);
    }
}