"use strict";
const lastBlockNmber = document.querySelector(".block_number");
const refreshBlock = document.querySelector(".ref");
const lodar = `<i class="fa fa-refresh"></i>`;
const lastBlockContainer = document.querySelector(".data");
const balanceForm = document.querySelectorAll(".balance_form");
const unitSelect = document.querySelector(".unit");
const selectedUnit = document.querySelector(".unit_bal");
const valBalance = document.querySelectorAll(".val_balance");
const tokenContract = document.querySelectorAll(".token");
const Web3 = require("web3");
const InfuraUrl = "https://mainnet.infura.io/v3/4b3d854ca37b4efaba96bda1eae8525a";
const web3 = new Web3(InfuraUrl);
function lastBlock() {
    const blockNum = new Promise((res) => {
        res(web3.eth.getBlockNumber().then());
    });
    return blockNum;
}
const refreshHandler = () => {
    lastBlockContainer.classList.add("rotate");
    lastBlockNmber.innerHTML = lodar;
    lastBlock()
        .then((lastBlock) => {
        lastBlockContainer.classList.remove("rotate");
        lastBlockNmber.innerHTML = lastBlock;
    })
        .catch((err) => {
        lastBlockContainer.classList.remove("rotate");
        lastBlockNmber.innerHTML = "Some Thing went wrong please try again !";
    });
};
refreshBlock.addEventListener("click", () => {
    refreshHandler();
});
refreshHandler();
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
unitMapArr.forEach((e) => {
    unitSelect.innerHTML += `<option ${e === "tether" ? "selected" : ""} value=${e}>${e === "tether" ? "tether USDT" : e}</option>`;
});
function balance(address, unit) {
    const balanceVal = new Promise((res, rej) => {
        if (address.length === 42) {
            web3.eth
                .getBalance(address)
                .then((balance) => {
                res(web3.utils.fromWei(balance, unit));
            })
                .catch((err) => {
                selectedUnit.innerText = "";
                valBalance[0].innerText = "Some Thing went wrong please try again !";
            });
        }
        else {
            rej("Please enter valid Token !!");
        }
    });
    return balanceVal;
}
const balanceHandler = () => {
    balanceForm[0].classList.add("send");
    valBalance[0].innerHTML = lodar;
    selectedUnit.innerText = "";
    balance(tokenContract[0].value, unitSelect.value).then((res) => {
        selectedUnit.innerText = " " + unitSelect.value;
        valBalance[0].innerText = " " + res;
    }, (rej) => {
        selectedUnit.innerText = "";
        valBalance[0].innerText = rej;
    });
    balanceForm[0].classList.remove("send");
};
balanceForm[0].addEventListener("submit", (e) => {
    e.preventDefault();
    balanceHandler();
});
balanceHandler();
