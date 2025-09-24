// hardhat.config.js
// EN/DE/RU: Minimal ESM config for Hardhat
export default {
  solidity: {
    version: "0.8.24",                               // EN/DE/RU: фиксируем solc
    settings: { optimizer: { enabled: true, runs: 200 } }
  }
};
