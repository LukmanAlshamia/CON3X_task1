import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextDecoder, TextEncoder });
import { describe, expect, test, jest } from "@jest/globals";
import firstWayBalance from "../src/ts/modules/firstWayBalance";
import { errMes, validMes } from "../src/ts/modules/Constents";

describe("Testing the First Way to calac Balacne of", () => {
  test("with valid address", async () => {
    const firstWayBalancee = jest.fn(firstWayBalance);
    await firstWayBalancee(
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "Wei"
    ).then(
      (res) => {
        expect(res).toBe("1");
      },
      (rej) => {
        expect(rej).toBe(errMes);
      }
    );
  }, 100000);

  test("with Unvalid address", async () => {
    const firstWayBalancee = jest.fn(firstWayBalance);
    await firstWayBalancee(
      "0xdAC17F958D2ee523a2206206994597C13D831ec71222",
      "Wei"
    )
    //First way
    .then(
      (res) =>{},
      (rej) => {
        expect(rej).toBe(validMes);
      }
      )
      //Second way
      // .catch((rej) => {
      //   expect(rej).toBe("Please enter valid Token !!");
      // });
  }, 100000);
});
