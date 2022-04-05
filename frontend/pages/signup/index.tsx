import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { EthProvider } from '../../interfaces/EthProvider';
import SignUpForm from '../../components/SignUpForm';
import useWallet from '../../hooks/useWallet';

const Index = () => {
    const router = useRouter();
    const { ethProviderPresent, isConnected, walletInfo } = useWallet();
    
    if (ethProviderPresent && isConnected)
        return (
            <div>
                <SignUpForm walletId={walletInfo.selectedAddress}/>
            </div>
        )

    return (
        <h1>Loading..</h1>
    )
}   

export default Index