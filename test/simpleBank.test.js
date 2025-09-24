// EN: Robust tests for SimpleBank (ESM) that tolerate provider quirks
// DE: Robuste Tests (ESM), die Provider-Macken tolerieren
// RU: Надёжные тесты (ESM), устойчивые к глюкам провайдера/ноды

// We keep OZ helpers only for events & BN. Revert checks -> manual try/catch.
import helpers from '@openzeppelin/test-helpers';            // EN/DE/RU
const { expectEvent, BN } = helpers;                         // EN/DE/RU
const SimpleBank = artifacts.require('SimpleBank');

contract('SimpleBank', (accounts) => {
  const [alice, bob] = accounts;

  it('deposit increases balance', async () => {
    const bank = await SimpleBank.deployed();
    const oneEth = web3.utils.toWei('1', 'ether');

    await bank.deposit({ from: alice, value: oneEth });
    const bal = await bank.balanceOf(alice);

    assert.equal(bal.toString(), oneEth, 'balance must be 1 ETH'); // EN/DE/RU
  });

  it('withdraw reduces balance', async () => {
    const bank = await SimpleBank.deployed();
    const half = web3.utils.toWei('0.5', 'ether');

    await bank.withdraw(half, { from: alice });
    const bal = await bank.balanceOf(alice);

    assert.equal(bal.toString(), half, 'balance must be 0.5 ETH'); // EN/DE/RU
  });

  it('rejects zero deposit (require)', async () => {
    const bank = await SimpleBank.deployed();

    let failed = false;
    try {
      await bank.deposit({ from: bob, value: 0 });
    } catch (err) {
      failed = true;
      // Accept any of these markers — different providers format differently
      const msg = (err && (err.reason || err.message || `${err}`)).toString();
      const ok =
        msg.includes('revert') ||           // common
        msg.includes('invalid') ||          // some nodes
        msg.includes('Internal error') ||   // Hardhat+Truffle quirk
        msg.includes('VM Exception');       // ganache style
      assert.ok(ok, `unexpected error: ${msg}`);
    }
    assert.ok(failed, 'tx must fail for zero deposit'); // EN/DE/RU
  });

  it('rejects over-withdraw (require funds)', async () => {
    const bank = await SimpleBank.deployed();
    const tooMuch = web3.utils.toWei('1', 'ether'); // bob has 0

    let failed = false;
    try {
      await bank.withdraw(tooMuch, { from: bob });
    } catch (err) {
      failed = true;
      const msg = (err && (err.reason || err.message || `${err}`)).toString();
      const ok =
        msg.includes('revert') ||
        msg.includes('invalid') ||
        msg.includes('Internal error') ||
        msg.includes('VM Exception');
      assert.ok(ok, `unexpected error: ${msg}`);
    }
    assert.ok(failed, 'tx must fail for insufficient funds'); // EN/DE/RU
  });

  it('emits events on deposit and withdraw', async () => {
    const bank = await SimpleBank.deployed();
    const val = new BN(web3.utils.toWei('0.1', 'ether'));

    const r1 = await bank.deposit({ from: bob, value: val });
    expectEvent(r1, 'Deposited', { user: bob, amount: val }); // EN/DE/RU

    const r2 = await bank.withdraw(val, { from: bob });
    expectEvent(r2, 'Withdrawn', { user: bob, amount: val }); // EN/DE/RU
  });
});
