// EN: Robust tests for SimpleBank (ESM-friendly)
// DE: Robuste Tests für SimpleBank (ESM-tauglich)
// RU: Надёжные тесты для SimpleBank (совместимо с ESM)

// EN: Import OZ helpers via default import (CJS package in ESM)
// DE: OZ-Helper per Default-Import laden (CJS-Paket in ESM)
// RU: Импортируем OZ-хелперы дефолтным импортом (CJS в ESM)
import helpers from '@openzeppelin/test-helpers';
const { expectRevert, expectEvent, BN } = helpers; // EN/DE/RU: достаём API

// EN: Truffle exposes 'artifacts' globally in the test runtime
// DE: Truffle stellt 'artifacts' global in der Testlaufzeit bereit
// RU: В тестах Truffle глобально доступен 'artifacts'
const SimpleBank = artifacts.require('SimpleBank');

contract('SimpleBank', (accounts) => {
  // EN: two test accounts
  // DE: zwei Testkonten
  // RU: два тестовых аккаунта
  const [alice, bob] = accounts;

  it('deposit increases balance', async () => {
    // EN: get deployed instance
    // DE: bereitgestellte Instanz holen
    // RU: получаем задеплоенную инстанцию
    const bank = await SimpleBank.deployed();

    // EN/DE/RU: 1 ETH in wei
    const oneEth = web3.utils.toWei('1', 'ether');

    // EN/DE/RU: deposit from Alice
    await bank.deposit({ from: alice, value: oneEth });

    // EN/DE/RU: read balance
    const bal = await bank.balanceOf(alice);

    // EN/DE/RU: must be exactly 1 ETH
    assert.equal(bal.toString(), oneEth, 'balance must be 1 ETH');
  });

  it('withdraw reduces balance', async () => {
    const bank = await SimpleBank.deployed();
    // EN/DE/RU: withdraw 0.5 ETH back
    const half = web3.utils.toWei('0.5', 'ether');

    await bank.withdraw(half, { from: alice });
    const bal = await bank.balanceOf(alice);

    assert.equal(bal.toString(), half, 'balance must be 0.5 ETH');
  });

  it('rejects zero deposit (require)', async () => {
    const bank = await SimpleBank.deployed();

    // EN: expect revert with message "zero" (from require in contract)
    // DE: Revert mit Meldung "zero" erwartet (aus require im Vertrag)
    // RU: ожидаем revert с сообщением "zero" (из require в контракте)
    await expectRevert(
      bank.deposit({ from: bob, value: 0 }),
      'zero'
    );
  });

  it('rejects over-withdraw (require funds)', async () => {
    const bank = await SimpleBank.deployed();

    // EN/DE/RU: Bob deposits 0.5 ETH first
    await bank.deposit({ from: bob, value: web3.utils.toWei('0.5', 'ether') });

    // EN/DE/RU: then tries to withdraw 1 ETH -> must revert "funds"
    await expectRevert(
      bank.withdraw(web3.utils.toWei('1', 'ether'), { from: bob }),
      'funds'
    );
  });

  it('emits events on deposit and withdraw', async () => {
    const bank = await SimpleBank.deployed();
    // EN/DE/RU: 0.1 ETH value as BN for event assertions
    const val = new BN(web3.utils.toWei('0.1', 'ether'));

    const r1 = await bank.deposit({ from: bob, value: val });
    // EN/DE/RU: Deposited(user, amount)
    expectEvent(r1, 'Deposited', { user: bob, amount: val });

    const r2 = await bank.withdraw(val, { from: bob });
    // EN/DE/RU: Withdrawn(user, amount)
    expectEvent(r2, 'Withdrawn', { user: bob, amount: val });
  });
});
