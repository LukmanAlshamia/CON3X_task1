import lastBlock from "./modules/lastBlock";
import firstWayBalance from "./modules/firstWayBalance";
import { ABI, abi, errMes, validMes } from "./modules/Constents";
import secondWayBalance from "./modules/secondWayBalance";
import { ContractOnceRequiresCallbackError } from "web3";

/* Start HTML Celectores */
//Last block
const lastBlockNmber = <HTMLElement>document.querySelector(".block_number");
const refreshBlock = <HTMLElement>document.querySelector(".ref");
const lodar: string = `<i class="fa fa-refresh"></i>`;
const lastBlockContainer = <HTMLElement>document.querySelector(".data");
//getBalance
const balanceForm: NodeListOf<HTMLFormElement> =
  document.querySelectorAll(".balance_form");
const unitSelect = <HTMLSelectElement>document.querySelector(".unit");
const selectedUnit = <HTMLElement>document.querySelector(".unit_bal");
const valBalance: NodeListOf<HTMLElement> =
  document.querySelectorAll(".val_balance");
const tokenContract: NodeListOf<HTMLInputElement> =
  document.querySelectorAll(".token");

//balanceOf
const accountName = <HTMLElement>document.querySelector(".account_name");
/* End HTML Celectores */

/* Start Connect with Ethereum Nodes using Web3.js */

/**
 * refreshHandler()
 * Function to handle refresh button.
 * using lastBlock() to get last block number and output data in page.
 * set and remove rotate class how rotate icons.
 */
const refreshHandler = (): void => {
  lastBlockContainer.classList.add("rotate");
  lastBlockNmber.innerHTML = lodar;
  lastBlock().then(
    (lastBlock: string): void => {
      lastBlockContainer.classList.remove("rotate");
      lastBlockNmber.innerHTML = lastBlock;
    },
    (err: string): void => {
      lastBlockContainer.classList.remove("rotate");
      lastBlockNmber.innerHTML = err;
    }
  );
  // .catch((err: string): void => {
  // });
};

/**
 * Event to listen refresh button then trigger refreshHandler()
 */
refreshBlock.addEventListener("click", (): void => {
  refreshHandler();
});

//For load data when page opened.
refreshHandler();
/* End Shows the last block number of Ethereum mainnet */

/* Start USDT balance of a provided address using getBalance() */

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

// For using in List
const unitMapArr: string[] = Object.keys(unitMap);
unitMapArr.forEach((e) => {
  unitSelect.innerHTML += `<option ${
    e === "tether" ? "selected" : ""
  } value=${e}>${e === "tether" ? "tether USDT" : e}</option>`;
});

/**
 * getBalanceHandler()
 * Function to handle submit form.
 * using firstWayBalance() to get balance of addreses entered and output data in page.
 */
const getBalanceHandler = (): void => {
  balanceForm[0].classList.add("send");
  valBalance[0].innerHTML = lodar;
  selectedUnit.innerText = "";
  firstWayBalance(tokenContract[0].value, unitSelect.value).then(
    (res: string): void => {
      selectedUnit.innerText = " " + unitSelect.value;
      valBalance[0].innerText = " " + res;
    },
    (rej: string) => {
      selectedUnit.innerText = "";
      valBalance[0].innerText = rej;
    }
  );
  balanceForm[0].classList.remove("send");
};

/**
 * Event to listen show balance button then trigger getBalanceHandler()
 */
balanceForm[0].addEventListener("submit", (e): void => {
  e.preventDefault();
  getBalanceHandler();
});
//For load data when page opened.
getBalanceHandler();
/* End USDT balance of a provided address using getBalance() */

/* Start USDT balance of a provided address using balanceOf() */

/**
 * balaneOfHandler()
 * Function to handle submit form.
 * using secondWayBalance() to get balance of addreses entered and output data in page.
 */
function balaneOfHandler() {
  let data: Promise<string>[] | boolean = secondWayBalance(
    abi,
    tokenContract[1].value
  );
  if (data) {
    balanceForm[1].classList.add("send");
    valBalance[1].innerHTML = lodar;
    accountName.innerText = "";
    data[0].then(
      (res: string): void => {
        valBalance[1].innerText = res;
      },
      (err: string): void => {
        valBalance[1].innerText = err;
      }
    );
    data[1].then(
      (res: string): void => {
        accountName.innerText = res;
      },
      (rej: string): void => {
        accountName.innerText = rej;
      }
    );
    balanceForm[1].classList.remove("send");
  } else {
    valBalance[1].innerText = validMes;
    accountName.innerText = "undefined";
  }
}

/**
 * Event to listen show balance button then trigger getBalanceHandler()
 */
balanceForm[1].addEventListener("submit", (e): void => {
  e.preventDefault();
  balaneOfHandler();
});

//For load data when page opened.
balaneOfHandler();
/* End USDT balance of a provided address using balanceOf() */
