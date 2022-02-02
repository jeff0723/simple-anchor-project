import * as anchor from '@project-serum/anchor';
import { Program } from "@project-serum/anchor";
import assert from 'assert';
import { AnchorPractice } from "../target/types/anchor_practice"
describe('anchor-practice', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.AnchorPractice as Program<AnchorPractice>

  let _baseAccount: anchor.web3.Keypair;

  it('Is initialized!', async () => {
    // Add your test here.
    const baseAccount = anchor.web3.Keypair.generate();
    const tx = await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      signers: [baseAccount],
    }
    );
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 0: ', account.count.toString())
    assert.ok(account.count.toNumber() == 0);
    _baseAccount = baseAccount;

  });
  it('increment', async () => {

    const baseAccount = _baseAccount;
    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 1: ', account.count.toString())
    assert.ok(account.count.toNumber() == 1);
  })
  it('decrement', async () => {
    const baseAccount = _baseAccount;
    await program.rpc.decrement({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 1: ', account.count.toString())
    assert.ok(account.count.toNumber() == 0);
  })
});
