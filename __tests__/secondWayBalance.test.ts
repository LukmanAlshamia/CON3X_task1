import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextDecoder, TextEncoder });
import { describe, expect, test, jest } from "@jest/globals";
import secondWayBalance from "../src/ts/modules/secondWayBalance";
import { errMes } from "../src/ts/modules/Constents";
import { abi } from "../src/ts/modules/Constents";

describe("Testing the Second Way to calac Balacne of", () => {
  test("with valid address", async () => {
    const secondWayBalancee = jest.fn(secondWayBalance);
    let data = secondWayBalancee(
      abi,
      "0xdAC17F958D2ee523a2206206994597C13D831ec71222"
    );
    if(data) {
      data[0].then(
        (res) => {
          expect(res).toBe("9402535479");
        },
        (rej) => {
          expect(rej).toBe(errMes);
        }
      );
      data[1].then(
        (res) => {
          expect(res).toBe("Tether USD");
        },
        (rej) => {
          expect(rej).toBe("undefined");
        }
      );
    }
  }, 100000);

  test("with Unvalid address", async () => {
    const secondWayBalancee = jest.fn(secondWayBalance);
    expect(
      secondWayBalancee(
        abi,
        "0xdAC17F958D2ee523a2206206994597C13D831ec712221212"
      )
    ).toBeFalsy();
  }, 100000);
});
