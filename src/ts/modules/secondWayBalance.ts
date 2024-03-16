import web3 from "./connectWeb3";
import { ABI, errMes } from "./Constents";
/**
 * secondWayBalance()
 * @param abi The abi array contain name and balanceOf methods.
 * @param address The address to get balance of for it.
 * @returns array contain two promises the first for balance of and second for name, or false if address not valid.
 */
function secondWayBalance(
  abi: ABI,
  address: string
): Promise<string>[] | false {
  if (address.length === 42) {
    //Using web3.js to connect with smart contract
    const contract = new web3.eth.Contract(abi, address);
    let data: Promise<string>[] = [];
    data.push(
      new Promise<string>((res, rej): void => {
        contract.methods
          .balanceOf(address)
          .call()
          .then(res)
          .catch((err: string): void => {
            rej(errMes);
          });
      })
    );

    data.push(
      new Promise<string>((res, rej): void => {
        contract.methods
          .name()
          .call()
          .then(res)
          .catch((err: string): void => {
            rej("undefined");
          });
      })
    );
    return data;
  } else {
    return false;
  }
}

// Export for testing
export default secondWayBalance;
