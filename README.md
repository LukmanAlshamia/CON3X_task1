# Con3X 🚀

### The first Task

# Dependencies

### [web3.js](https://web3js.org/)

# DevDependencies

### [typescript](https://www.typescriptlang.org/)
### [browserify](https://browserify.org/) 
### [watchify](https://www.npmjs.com/package/watchify) 
### [jest](https://jestjs.io/)
- @jest/global
- jest-environment-jsdom 
- ts-jest 

# Structure of Task

### src
- assets 
  - A svg for Etherum.
- ts
  - modules
    - Constents.ts : some const values used in Task.
    - connectWeb3.ts : code responsible to connect with Etherum nodes using web3.js.
    - lastBlock.ts : code responsible to get last block number.
    - firstWayBalance.ts : code responsible to the first way to get balance of for any address and select unit for balance using web3.js function.
    - secondWayBalance.ts : code responsible to the second way to get balance of for any address using smart contract.
  - index. ts : code responsible to link part of interface with code suits with it.

### dist
- css
  - main.css : code responsible to style page.
- js
  - index.js : output code from typescript compile.
  - bundle.js : output code from browserify library and that file which called in the page.

  ### \_\_test\_\_
  - firstWayBalance.test.ts : code responsible to test firstWayBalance.ts module.
  - lastBlock.test.ts : code responsible to test lastBlock.ts module.
  - secondWayBalance.test.ts: code responsible to test secondWayBalance.ts module.

> [!NOTE]
> You can run test code using jest extintion (Orta.vscode-jest) in vs code or tun this command :
```
> npm run test
```
