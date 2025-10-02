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

  it('keeps balances independent per user (delta-based)', async () => {
  const bank = await SimpleBank.deployed(); // EN: get deployed contract / DE: hole Instanz / RU: берём контракт
  const [a0, a1] = accounts; // EN: first two accounts / DE: erste zwei Accounts / RU: первые два аккаунта


  // Считаем начальные балансы (тесты запускаются в одном контракте, поэтому работаем по дельтам)
  const a0Before = await bank.balanceOf(a0); // EN: balance a0 before / DE: Saldo a0 vor / RU: баланс a0 до
  const a1Before = await bank.balanceOf(a1); // EN: balance a1 before / DE: Saldo a1 vor / RU: баланс a1 до

  const depA0 = web3.utils.toWei('0.2', 'ether'); // EN: deposit 0.2 ETH / DE: Einzahlung 0,2 ETH / RU: депозит 0.2 ETH
  const depA1 = web3.utils.toWei('0.3', 'ether'); // EN: deposit 0.3 ETH / DE: Einzahlung 0,3 ETH / RU: депозит 0.3 ETH

  await bank.deposit({ from: a0, value: depA0 }); // EN: a0 deposits / DE: a0 zahlt ein / RU: a0 вносит депозит
  await bank.deposit({ from: a1, value: depA1 }); // EN: a1 deposits / DE: a1 zahlt ein / RU: a1 вносит депозит

  const a0After = await bank.balanceOf(a0); // EN: balance a0 after / DE: Saldo a0 nach / RU: баланс a0 после
  const a1After = await bank.balanceOf(a1); // EN: balance a1 after / DE: Saldo a1 nach / RU: баланс a1 после

  // Проверяем приращение, а не абсолютные числа — так тест стабилен при любом порядке
  const deltaA0 = (BigInt(a0After.toString()) - BigInt(a0Before.toString())).toString(); // EN: delta a0 / DE: Differenz a0 / RU: приращение a0
  const deltaA1 = (BigInt(a1After.toString()) - BigInt(a1Before.toString())).toString(); // EN: delta a1 / DE: Differenz a1 / RU: приращение a1

  assert.equal(deltaA0, depA0, 'a0 delta must equal its deposit'); // EN: check a0 / DE: prüfe a0 / RU: проверка a0
  assert.equal(deltaA1, depA1, 'a1 delta must equal its deposit'); // EN: check a1 / DE: prüfe a1 / RU: проверка a1
  });

  it('can withdraw full balance to zero and reject any extra', async () => {
  const bank = await SimpleBank.deployed(); // EN: get deployed contract / DE: hole Instanz / RU: берём контракт
  const [, a1] = accounts; // EN: take a1 / DE: nimm a1 / RU: берём a1

  // Берём весь текущий баланс a1 и выводим его
  const bal = await bank.balanceOf(a1); // EN: read balance / DE: Saldo lesen / RU: читаем баланс
  if (bal.toString() !== '0') {
    await bank.withdraw(bal, { from: a1 }); // EN: withdraw full balance / DE: gesamten Saldo abheben / RU: снимаем весь баланс
  }
  const afterZero = await bank.balanceOf(a1); // EN: balance after withdraw / DE: Saldo nach Abhebung / RU: баланс после снятия
  assert.equal(afterZero.toString(), '0', 'balance must be zero after full withdraw'); // EN: must be zero / DE: muss null sein / RU: должен быть ноль

  // Любая попытка снять сверх нуля — должна падать
  let failed = false; // EN: flag for fail / DE: Flag für Fehler / RU: флаг ошибки
  try {
    await bank.withdraw(web3.utils.toWei('0.000000000000000001', 'ether'), { from: a1 }); // EN: withdraw 1 wei / DE: 1 wei abheben / RU: снять 1 wei
  } catch (e) {
    failed = true; // EN: caught error / DE: Fehler gefangen / RU: ошибка поймана
  }
  assert.ok(failed, 'extra withdraw from zero balance must fail'); // EN: must fail / DE: muss fehlschlagen / RU: должно упасть
});

});
