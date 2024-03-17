import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextDecoder, TextEncoder });
import { describe, expect, test, jest, beforeAll } from "@jest/globals";
import lastBlock from "../src/ts/modules/lastBlock";
import { errMes } from "../src/ts/modules/Constents";

let last: string;
beforeAll(async () => {
  await lastBlock()
    .then((res) => {
      last = res;
    })
    .catch((err) => {});
}, 10000);

describe("Testing the last block number of Ethereum mainnet.", () => {
  test("Return the last block number", async () => {
    const lastBlocke = jest.fn(lastBlock);
    await lastBlocke().then(
      (res) => {
        expect(res.toString()).toBe(last.toString());
      },
      (rej) => {
        expect(rej).toBe(errMes);
      }
    );
  }, 10000);
});
