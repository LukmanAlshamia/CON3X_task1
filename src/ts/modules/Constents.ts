type ABI = {
  constant: boolean;
  inputs: {
    name: string;
    type: string;
  }[];
  name: string;
  outputs: {
    name: string;
    type: string;
  }[];
  payable: boolean;
  stateMutability: string;
  type: string;
}[];

//abi contain methods we used.
const abi: ABI = [
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

/* Error Messages */
const errMes = "Some Thing went wrong please try again !";
const validMes = "Please enter valid Token !!";
/* Error Messages */

export { ABI, abi, errMes, validMes };
