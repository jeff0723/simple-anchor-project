import React, { useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js';
import {
    Program, Provider, web3, Idl
} from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import idl from '../idl.json'
import { Button, Grid, Card, Container, IconButton } from "@mui/material"
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {

}
const programID = new PublicKey(idl.metadata.address);
const { SystemProgram, Keypair } = web3;
/* create an account  */
const baseAccount = Keypair.generate();
const Home = (props: Props) => {
    const wallet = useWallet();
    console.log('baseAccount: ', baseAccount.publicKey.toString())
    if (wallet) {
        console.log('wallet: ', wallet.publicKey)
    }
    const [value, setValue] = useState(0);
    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */
        const network = 'https://api.devnet.solana.com';
        const connection = new Connection(network, "confirmed");

        if (wallet) {
            const provider = new Provider(
                //@ts-ignore
                connection, wallet, "confirmed",
            );
            return provider;

        }
    }
    async function createCounter() {
        const provider = await getProvider()
        /* create the program interface combining the idl, program ID, and provider */
        //@ts-ignore
        const program = new Program(idl, programID, provider);
        console.log(program.programId.toString())

        try {
            /* interact with the program via rpc */
            //@ts-ignore
            await program.rpc.create({
                accounts: {
                    baseAccount: baseAccount.publicKey,
                    user: provider?.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
                signers: [baseAccount]
            });

            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
            console.log('account: ', account);
            setValue(account.count.toNumber());
        } catch (err) {
            console.log("Transaction error: ", err);
        }
    }
    async function increment() {
        const provider = await getProvider();
        const program = new Program(idl as Idl, programID, provider);
        try {
            await program.rpc.increment({
                accounts: {
                    baseAccount: baseAccount.publicKey
                }
            });

            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
            console.log('account: ', account);
            setValue(account.count.toString());
        } catch (err) {
            console.log('error: ', err);
        }
    }
    async function decrement() {
        const provider = await getProvider();
        const program = new Program(idl as Idl, programID, provider);
        try {
            await program.rpc.decrement({
                accounts: {
                    baseAccount: baseAccount.publicKey
                }
            });

            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
            console.log('account: ', account);
            setValue(account.count.toString());
        } catch (err) {
            console.log('error: ', err);

        }
    }
    return (
        <Container style={{ height: '100vh', display: 'flex', padding: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '50%', height: "50%", display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontSize: '32px' }}>
                    <IconButton style={{ fontSize: '32px', color: '#512da8' }} onClick={increment}><AddIcon /></IconButton>
                    <div>
                        {value}
                    </div>
                    <IconButton style={{ fontSize: '32px', color: '#512da8' }} onClick={decrement}><RemoveIcon /></IconButton>
                </div>
                <div>
                    <Button style={{ width: '100%', borderRadius: '16px', backgroundColor: '#512da8', color: '#ffffff', textTransform: 'none' }} onClick={!value ? createCounter : () => { alert('already created') }}>Create</Button>

                </div>
            </div>

        </Container>
    )
}

export default Home
