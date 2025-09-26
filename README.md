# SimpleBank (Solidity + Truffle)

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![build](https://img.shields.io/badge/build-passing-brightgreen)
![GitHub stars](https://img.shields.io/github/stars/CrystalGalaxy777/my-solidity?style=social)
![last commit](https://img.shields.io/github/last-commit/CrystalGalaxy777/my-solidity)
![repo size](https://img.shields.io/github/repo-size/CrystalGalaxy777/my-solidity)

---

>EN: Minimal learning project — smart contract **SimpleBank** with deposit, withdraw, balance, events, tests, CI (Truffle + Ganache).  
>DE: Minimales Lernprojekt — Smart Contract **SimpleBank** mit Einzahlen, Abheben, Kontostand, Events, Tests, CI (Truffle + Ganache).  
>RU: Мини-проект для обучения — смарт-контракт **SimpleBank** с депозитом, выводом, балансом, событиями, тестами, CI (Truffle + Ganache).

---

## Highlights

- EN: Deposit & Withdraw ETH with events    
- EN: Prevents zero deposits & over-withdraw    
- EN: Includes automated tests (Mocha + Chai + OpenZeppelin test-helpers)   


- DE: ETH einzahlen & abheben mit Events    
- DE: Verhindert Null-Einzahlungen & Überabhebungen   
- DE: Enthält automatisierte Tests (Mocha + Chai + OpenZeppelin test-helpers)    

- RU: Внесение и вывод ETH с событиями      
- RU: Запрещает нулевые депозиты и сверх-вывод      
- RU: Включает автоматические тесты (Mocha + Chai + OpenZeppelin test-helpers)  

---

## How to run

### 1. Compile
```bash
npm run compile
````

### 2. Start Ganache (Terminal 1)

```bash
npm run ganache
```

### 3. Deploy (Terminal 2)

```bash
npm run migrate:dev
```

### 4. Run tests

```bash
npm run test:dev
```

Output example:

```
  Contract: SimpleBank
    ✓ deposit increases balance
    ✓ withdraw reduces balance
    ✓ rejects zero deposit (require)
    ✓ rejects over-withdraw (require funds)
    ✓ emits events on deposit and withdraw

  5 passing (350ms)
```

---

## New features (v1.0)

* EN: Deposit & Withdraw with **events**

* DE: Einzahlen & Abheben mit **Events**

* RU: Депозит и вывод с **событиями**

* EN: Revert checks for invalid actions (zero deposit, over-withdraw)

* DE: Revert-Prüfungen für ungültige Aktionen (Null-Einzahlung, Überabhebung)

* RU: Проверки отката для недопустимых действий (нулевой депозит, сверх-вывод)

* EN: GitHub Actions CI pipeline (compile + test)

* DE: GitHub Actions CI-Pipeline (Kompilierung + Test)

* RU: CI-пайплайн GitHub Actions (компиляция + тесты)

---

## License / Lizenz / Лицензия

* EN: This project is licensed under the MIT License — see [LICENSE](LICENSE).
* DE: Dieses Projekt ist unter der MIT-Lizenz veröffentlicht — siehe [LICENSE](LICENSE).
* RU: Этот проект распространяется по лицензии MIT — см. [LICENSE](LICENSE).
