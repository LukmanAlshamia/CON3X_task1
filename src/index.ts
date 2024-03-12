// All unit in web3.js it should be web3.utils.unitMap but it doesn't work or not supported in this version
const unitMap = {
  wei: "1",
  kwei: "1000",
  ada: "1000",
  femtoether: "1000",
  mwei: "1000000",
  babbage: "1000000",
  picoether: "1000000",
  gwei: "1000000000",
  shannon: "1000000000",
  nanoether: "1000000000",
  nano: "1000000000",
  szabo: "1000000000000",
  microether: "1000000000000",
  micro: "1000000000000",
  finney: "1000000000000000",
  milliether: "1000000000000000",
  milli: "1000000000000000",
  ether: "1000000000000000000",
  kether: "1000000000000000000000",
  grand: "1000000000000000000000",
  einstein: "1000000000000000000000",
  mether: "1000000000000000000000000",
  gether: "1000000000000000000000000000",
  tether: "1000000000000000000000000000000",
};

const unitMapArr: string[] = Object.keys(unitMap); // For using in List

const Web3: any = require("web3"); // For using library, to make it work in browser i used browserify library

const InfuraUrl: string = // A provider to connect with Etherium nodesF
  "https://mainnet.infura.io/v3/4b3d854ca37b4efaba96bda1eae8525a";

let web3 = new Web3(InfuraUrl); // Connect with Ethereum nodes using web3.js

const address = "0x00000000219ab540356cBB839Cbe05303d7705Fa"; // Default address i taked it from link in email

// @balance : To get balnce of an address with any unit you selected.
function balance(address: string, unit: string): void {
  if (address.length === 42) {
    // To chake if a correct address.
    //getBalance: Get the balance of an address at a given block, returns Promise returns String - The current balance for the given address in wei.
    web3.eth.getBalance(address).then((balance: string) => {
      //fromWei: Converts any wei value into an ether value, return String: It always returns a string number.
      console.log(web3.utils.fromWei(balance, unit));
    });
  }
}

balance(address, "tether");

//getBlockNumber: Returns the current block number, Returns Promise returns Number - The number of the most recent block.
web3.eth.getBlockNumber().then((lastBlock: string) => {
  console.log(lastBlock);
});
