// migrations/1_deploy_simplebank.js
// EN: First migration script / DE: Erstes Migrationsskript / RU: Первый миграционный скрипт

const SimpleBank = artifacts.require("SimpleBank"); // EN: Import contract artifact / DE: Artifact importieren / RU: Импорт артефакта контракта

module.exports = function (deployer) {
  deployer.deploy(SimpleBank);                      // EN: Deploy contract / DE: Contract deployen / RU: Деплой контракта
};
