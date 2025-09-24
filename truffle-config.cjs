// truffle-config.cjs
module.exports = {
  networks: {
    development: { host: "127.0.0.1", port: 8545, network_id: 31337 },
  },
  compilers: {
    solc: {
      version: "0.8.24", // EN: use local npm solc / DE: lokalen npm-solc nutzen / RU: используем локальный solc из npm
      settings: { optimizer: { enabled: true, runs: 200 } }
    }
  }
};
