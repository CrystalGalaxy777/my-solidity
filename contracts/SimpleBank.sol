// SPDX-License-Identifier: MIT 
// EN: License / DE: Lizenz / RU: Лицензия
pragma solidity ^0.8.24; // EN: Compiler version / DE: Compiler-Version / RU: Версия компилятора

contract SimpleBank {                                       // EN: Minimal learning bank / DE: Minimale Lern-Bank / RU: Учебный мини-банк
    mapping(address => uint256) private balances;           // EN: Map user→balance / DE: Nutzer→Kontostand / RU: Пользователь→баланс

    event Deposited(address indexed user, uint256 amount);  // EN: Deposit log / DE: Einzahlungs-Event / RU: Событие депозита
    event Withdrawn(address indexed user, uint256 amount);  // EN: Withdraw log / DE: Abhebungs-Event / RU: Событие вывода

    // EN: Deposit ETH / DE: ETH einzahlen / RU: Внести эфир
    function deposit() public payable {
        require(msg.value > 0, "zero");                     // EN: Must send >0 / DE: >0 benoetigt / RU: >0
        balances[msg.sender] += msg.value;                  // EN: Increase balance / DE: Kontostand erhoehen / RU: Увеличиваем баланс
        emit Deposited(msg.sender, msg.value);              // EN/DE/RU: Логируем депозит
    }

    // EN: Withdraw ETH / DE: ETH abheben / RU: Вывести эфир
    function withdraw(uint256 amount) external {
        require(amount > 0, "zero");                        // EN: must request >0 / DE: >0 erforderlich / RU: >0 обязательно
        uint256 bal = balances[msg.sender];                 // EN: Cache balance / DE: Kontostand lesen / RU: Читаем баланс
        require(bal >= amount, "funds");                    // EN: Enough balance? / DE: Genug Guthaben? / RU: Хватает ли средств?

        balances[msg.sender] = bal - amount;                // EN: Effect / DE: Effekt / RU: Эффект
        (bool ok, ) = payable(msg.sender).call{value: amount}(""); // EN: Interaction / DE: Interaktion / RU: Перевод эфира
        if (!ok) {
            balances[msg.sender] = bal;                     // EN/DE/RU: Откат
            revert("xfer");                                 // EN: revert / DE: revertieren / RU: откат
        }

        emit Withdrawn(msg.sender, amount);                 // EN/DE/RU: Лог вывода
    }

    // EN: Read balance / DE: Kontostand lesen / RU: Прочитать баланс
    function balanceOf(address user) external view returns (uint256) {
        return balances[user];                              // EN/DE/RU: вернуть баланс
    }

    // EN: Allow plain ETH sends / DE: Direkte ETH-Sends zulassen / RU: Приём эфира напрямую
    receive() external payable {
        deposit();                                          // теперь легально, т.к. deposit — public
    }
}
