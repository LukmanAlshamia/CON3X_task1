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
const accountName = document.querySelector(".account_name");
const errMes = "Some Thing went wrong please try again !";
const validMes = "Please enter valid Token !!";
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
        lastBlockNmber.innerHTML = errMes;
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
function firstWayBalance(address, unit) {
    const balanceVal = new Promise((res, rej) => {
        if (address.length === 42) {
            web3.eth
                .getBalance(address)
                .then((balance) => {
                res(web3.utils.fromWei(balance, unit));
            })
                .catch((err) => {
                selectedUnit.innerText = "";
                valBalance[0].innerText = errMes;
            });
        }
        else {
            rej(validMes);
        }
    });
    return balanceVal;
}
const getBalanceHandler = () => {
    balanceForm[0].classList.add("send");
    valBalance[0].innerHTML = lodar;
    selectedUnit.innerText = "";
    firstWayBalance(tokenContract[0].value, unitSelect.value).then((res) => {
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
    getBalanceHandler();
});
getBalanceHandler();
const abi = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "who", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
];
function secondWayBalance(abi, address) {
    if (address.length === 42) {
        const contract = new web3.eth.Contract(abi, address);
        let data = [];
        data.push(new Promise((res) => {
            res(contract.methods.balanceOf(address).call().then());
        }));
        data.push(new Promise((res) => {
            res(contract.methods.name().call().then());
        }));
        return data;
    }
    else {
        return false;
    }
}
function balaneOfHandler() {
    let data = secondWayBalance(abi, tokenContract[1].value);
    if (data) {
        balanceForm[1].classList.add("send");
        valBalance[1].innerHTML = lodar;
        accountName.innerText = "";
        data[0].then((res) => {
            valBalance[1].innerText = res;
        }).catch((err) => {
            valBalance[1].innerText = errMes;
        });
        data[1].then((res) => {
            accountName.innerText = res;
        }).catch((err) => {
            accountName.innerText = "undefined";
        });
        balanceForm[1].classList.remove("send");
    }
    else {
        valBalance[1].innerText = validMes;
        accountName.innerText = "undefined";
    }
}
balanceForm[1].addEventListener("submit", (e) => {
    e.preventDefault();
    balaneOfHandler();
});
balaneOfHandler();
