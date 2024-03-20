import { useEffect, useState } from 'react';
import './App.css';

import { BrowserProvider, ethers } from "ethers";
import { Counter } from './generated/contract-types';
import { Counter__factory } from './generated/contract-types/factories';

declare let window: any

function App() {
  const [web3Provider, setWeb3Provider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [num, setNum] = useState<number | null>(null);
  const [owner, setOwner] = useState("");
  const [slicedArray, setSlicedArray] = useState<string[]>([]);
  const [newNum, setNewNum] = useState<string>('');

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setWeb3Provider(provider);
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress('');
        }
	const owner = await instance.methods.owner().call();
      setOwner(owner);
      });
    }
  }, []);

  const handleConnectWallet = async () => {
    if (web3Provider) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAddress = accounts[0];
        setAddress(selectedAddress);
        const balanceInWei = await web3Provider.getBalance(selectedAddress);
        const balanceInEther = ethers.formatEther(balanceInWei);
        setBalance(balanceInEther);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  const handleGetNum = async () => {
    if (web3Provider) {
      try {
        const contract = Counter__factory.connect('0x2B1740F7175C598d84307D35B39d45eC76Ef933d', web3Provider);
        const result = await contract.getNum();
        setNum(Number(result));
      } catch (error) {
        console.error('Error fetching num:', error);
      }
    }
  };

  const handleSetNum = async () => {
    if (web3Provider && newNum !== '') {
      try {
	const provider = new ethers.BrowserProvider(window.ethereum)
	const signer = await provider.getSigner()
     
        const contract = Counter__factory.connect('0x2B1740F7175C598d84307D35B39d45eC76Ef933d', signer);
       
        const balanceInWei = await web3Provider.getBalance(address);
        const balanceInEther = ethers.formatEther(balanceInWei);
        setBalance(balanceInEther);
      } catch (error) {
        console.error('Error setting num:', error);
      }
    }
  };


const handleFirstNumArray = async () => {
  if (web3Provider && num !== null) {
    try {
      const contract = Counter__factory.connect('0x2B1740F7175C598d84307D35B39d45eC76Ef933d', web3Provider);
      const result = await contract.firstNumElements(num);
      setSlicedArray(result);
    } catch (error) {
      console.error('Error fetching firstNumArray:', error);
    }
  }
};

const handleLastNumArray = async () => {
  if (web3Provider && num !== null) {
    try {
      const contract = Counter__factory.connect('0x2B1740F7175C598d84307D35B39d45eC76Ef933d', web3Provider);
      const result = await contract.lastNumElements(num);
      setSlicedArray(result);
    } catch (error) {
      console.error('Error fetching lastNumArray:', error);
    }
  }
};
const handleTransferFunds = async () => {
  if (web3Provider && address && owner) {
    try {
      const signer = web3Provider.getSigner();
      const contract = Counter__factory.connect('0x2B1740F7175C598d84307D35B39d45eC76Ef933d', signer);

      
      const tx = await contract.transferFunds(owner, ethers.utils.parseEther(newNum));

      // Wait for the transaction to be confirmed
      await tx.wait();
      console.log('Funds transferred successfully');
    } catch (error) {
      console.error('Error transferring funds:', error);
    }
  }
};

  return (
    <div className="App">
      <h1>Homework 2</h1>
      <br />
      {address ? (
            <>
		<div>Owner Address: {owner}</div>
              <div> My address: {address}</div>
              <div>{balance}</div>
            </>
          ) : (
            <button onClick={handleConnectWallet}>Connect Wallet</button>
          )}

<br />

      <button onClick={handleGetNum}>Get Num</button>
      {num !== null && <div>Current Num: {num}</div>}

      <br />

      <input
        type="text"
        placeholder="Enter new Num"
        value={newNum}
        onChange={(e) => setNewNum(e.target.value)}
      />
      <button onClick={handleSetNum}>Set Num (Pay with MetaMask)</button>

      <br />


	<button onClick={handleFirstNumArray}>FirstNumArray </button><br />
	<button onClick={handleLastNumArray}>LastNumArray </button><br />
	<button onClick={handleTransferFunds}>Transfer Funds </button><br />
      <ul>
        {slicedArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}      </ul>
    </div>
  );
}

export default App;

      
