"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lastBlock_1 = __importDefault(require("./lastBlock"));
const firstWayBalance_1 = __importDefault(require("./firstWayBalance"));
const Constents_1 = require("./Constents");
const secondWayBalance_1 = __importDefault(require("./secondWayBalance"));
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
const refreshHandler = () => {
    lastBlockContainer.classList.add("rotate");
    lastBlockNmber.innerHTML = lodar;
    (0, lastBlock_1.default)().then((lastBlock) => {
        lastBlockContainer.classList.remove("rotate");
        lastBlockNmber.innerHTML = lastBlock;
    }, (err) => {
        lastBlockContainer.classList.remove("rotate");
        lastBlockNmber.innerHTML = err;
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
const getBalanceHandler = () => {
    balanceForm[0].classList.add("send");
    valBalance[0].innerHTML = lodar;
    selectedUnit.innerText = "";
    (0, firstWayBalance_1.default)(tokenContract[0].value, unitSelect.value).then((res) => {
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
function balaneOfHandler() {
    let data = (0, secondWayBalance_1.default)(Constents_1.abi, tokenContract[1].value);
    if (data) {
        balanceForm[1].classList.add("send");
        valBalance[1].innerHTML = lodar;
        accountName.innerText = "";
        data[0].then((res) => {
            valBalance[1].innerText = res;
        }, (err) => {
            valBalance[1].innerText = err;
        });
        data[1].then((res) => {
            accountName.innerText = res;
        }, (rej) => {
            accountName.innerText = rej;
        });
        balanceForm[1].classList.remove("send");
    }
    else {
        valBalance[1].innerText = Constents_1.validMes;
        accountName.innerText = "undefined";
    }
}
balanceForm[1].addEventListener("submit", (e) => {
    e.preventDefault();
    balaneOfHandler();
});
balaneOfHandler();
