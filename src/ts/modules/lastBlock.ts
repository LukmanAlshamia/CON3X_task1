import web3 from "./connectWeb3";
import { errMes } from "./Constents";

/**
 * lastBlock()
 * Using getBlockNumber() from web3.js which return promise contain the current block number.
 */
async function lastBlock(): Promise<string> {
  //I used Promise object to used TypeScript Generics at some part of my code
  const blockNum: string = await new Promise<string>((res, rej) => {
    web3.eth
      .getBlockNumber()
      .then((data: string): void => {
        res(data);
      })
      .catch((err: string): void => {
        rej(errMes);
      });
  });
  return blockNum;
}

export default lastBlock;
