import React, { FC } from 'react'
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Layout, Typography } from 'antd'
require('@solana/wallet-adapter-react-ui/styles.css')


interface Props {

}
const { Header, Footer, Content } = Layout
const { Text } = Typography
const styles = {
    header: {
        display: "flex",
        justifyContent: 'space-between',
        padding: '16px'
    },
    title: {
        color: "#ffffff",
        fontSize: '24px',
        fontWeight: "bold",
    },
    wallet: {
        display: 'inline-block',
        alignItems: 'center'
    }
}
const AppLayout: FC = ({ children }) => {
    return (
        <div>
            <Header>
                <div style={styles.header}>
                    <div>
                        <Text style={styles.title}>Anchor Practice</Text>
                    </div>
                    <div style={styles.wallet}>
                        <WalletModalProvider>
                            <WalletMultiButton />
                        </WalletModalProvider>
                    </div>
                </div>
            </Header>

            {children}
        </div>
    )
}

export default AppLayout
