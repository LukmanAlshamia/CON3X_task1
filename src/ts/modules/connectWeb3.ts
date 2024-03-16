import Web3 from "web3";
/* Start Connect with Ethereum Nodes using Web3.js */
// const Web3: any = require("web3"); // For using library, to make it work in browser i used browserify library
const InfuraUrl: string = // A provider to connect with Etherium nodesF
  "https://mainnet.infura.io/v3/4b3d854ca37b4efaba96bda1eae8525a";
const web3: any = new Web3(InfuraUrl); // Connect with Ethereum nodes using web3.js
/* End Connect with Ethereum Nodes using Web3.js */
export default web3;
