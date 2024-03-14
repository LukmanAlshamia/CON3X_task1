/* Start HTML Celectores */
//Last block
const lastBlockNmber = <HTMLElement>document.querySelector(".block_number");
const refreshBlock = <HTMLElement>document.querySelector(".ref");
const lodar: string = `<i class="fa fa-refresh"></i>`;
const lastBlockContainer = <HTMLElement>document.querySelector(".data");
//getBalance
const balanceForm :NodeListOf<HTMLFormElement>  =  document.querySelectorAll(".balance_form");
const unitSelect = <HTMLSelectElement>document.querySelector(".unit");
const selectedUnit = <HTMLElement>document.querySelector(".unit_bal");
const valBalance :NodeListOf<HTMLElement> = document.querySelectorAll(".val_balance");
const tokenContract :NodeListOf<HTMLInputElement> = document.querySelectorAll(".token");
/* End HTML Celectores */

/* Start Connect with Ethereum Nodes using Web3.js */
const Web3: any = require("web3"); // For using library, to make it work in browser i used browserify library
const InfuraUrl: string = // A provider to connect with Etherium nodesF
  "https://mainnet.infura.io/v3/4b3d854ca37b4efaba96bda1eae8525a";
const web3: any = new Web3(InfuraUrl); // Connect with Ethereum nodes using web3.js
/* End Connect with Ethereum Nodes using Web3.js */

/* Start Shows the last block number of Ethereum mainnet */

/**
 * lastBlock()
 * Using getBlockNumber() from web3.js which return promise contain the current block number.
 */
function lastBlock(): Promise<string> {
  //I used Promise object to used TypeScript Generics at some part of my code 😉
  const blockNum: Promise<string> = new Promise<string>((res) => {
    res(web3.eth.getBlockNumber().then());
  });
  return blockNum;
}

/**
 * refreshHandler()
 * Function to handle refresh button.
 * using lastBlock() to get last block number and output data in page.
 * set and remove rotate class how rotate icons.
 */
const refreshHandler = (): void => {
  lastBlockContainer.classList.add("rotate");
  lastBlockNmber.innerHTML = lodar;
  lastBlock()
    .then((lastBlock: string): void => {
      lastBlockContainer.classList.remove("rotate");
      lastBlockNmber.innerHTML = lastBlock;
    })
    .catch((err: string): void => {
      lastBlockContainer.classList.remove("rotate");
      lastBlockNmber.innerHTML = "Some Thing went wrong please try again !";
    });
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
 *
 * @param address The token entered.
 * @param unit The unit entered.
 * @returns Promise from getBalance() and fromWei() which used from Web3.js to fetch data.
 */
function balance(address: string, unit: string): Promise<string> {
  const balanceVal: Promise<string> = new Promise<string>((res, rej) => {
    // To chake if a valid address.
    if (address.length === 42) {
      //getBalance: Get the balance of an address at a given block, returns Promise returns String - The current balance for the given address in wei.
      web3.eth
        .getBalance(address)
        .then((balance: string) => {
          //fromWei: Converts any wei value into an ether value, return String: It always returns a string number.
          res(web3.utils.fromWei(balance, unit));
        })
        .catch((err: string): void => {
          selectedUnit.innerText = "";
          valBalance[0].innerText = "Some Thing went wrong please try again !";
        });
    } else {
      rej("Please enter valid Token !!");
    }
  });
  return balanceVal;
}

/**
 * balanceHandler()
 * Function to handle submit form.
 * using balance() to get balance of addreses entered and output data in page.
 */
const balanceHandler = (): void => {
  balanceForm[0].classList.add("send");
  valBalance[0].innerHTML = lodar;
  selectedUnit.innerText = "";
  balance(tokenContract[0].value, unitSelect.value).then(
    (res: string): void => {
      selectedUnit.innerText = " " + unitSelect.value;
      valBalance[0].innerText = " " + res;
    },
    (rej) => {
      selectedUnit.innerText = "";
      valBalance[0].innerText = rej;
    }
  );
  balanceForm[0].classList.remove("send");
};

/**
 * Event to listen show balance button then trigger balanceHandler()
 */
balanceForm[0].addEventListener("submit", (e): void => {
  e.preventDefault();
  balanceHandler();
});

//For load data when page opened.
balanceHandler();
/* End USDT balance of a provided address using getBalance() */
