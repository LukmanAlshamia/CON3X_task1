"use strict";
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
const unitMapArr = Object.keys(unitMap);
const Web3 = require("web3");
const InfuraUrl = "https://mainnet.infura.io/v3/4b3d854ca37b4efaba96bda1eae8525a";
let web3 = new Web3(InfuraUrl);
const address = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
function balance(address, unit) {
    if (address.length === 42) {
        web3.eth.getBalance(address).then((balance) => {
            console.log(web3.utils.fromWei(balance, unit));
        });
    }
}
balance(address, "tether");
web3.eth.getBlockNumber().then((lastBlock) => {
    console.log(lastBlock);
});
