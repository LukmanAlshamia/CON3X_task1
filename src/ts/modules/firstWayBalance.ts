import web3 from "./connectWeb3";
import { errMes, validMes } from "./Constents";

/**
 * firstWayBalance()
 * @param address The token entered.
 * @param unit The unit entered.
 * @returns Promise from getBalance() and fromWei() which used from Web3.js to fetch data.
 */
async function firstWayBalance(address: string, unit: string): Promise<string> {
  const balanceVal: string = await new Promise<string>((res, rej) => {
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
          rej(errMes);
        });
    } else {
      rej(validMes);
    }
  });
  return balanceVal;
}

// Export for testing
export default firstWayBalance;
