import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { EthProvider } from '../../interfaces/EthProvider';
import SignUpForm from '../../components/SignUpForm';

const Index = () => {
    const router = useRouter();

    // get wallet id
    const [walletIdLoaded, setWalletIdLoaded] = useState<boolean>();
    const [walletId, setWalletId] = useState<string>();
    useEffect(() => {
        const fetchUser = async() => {
            var accounts = await ((window as any).ethereum as EthProvider).request( {method: 'eth_requestAccounts'});
            if (accounts) {
                return accounts[0]
            }
        }
        fetchUser().then(res => {
            setWalletId(res);
            setWalletIdLoaded(true);
            console.log(res);
        });
    }, [])

    
    return (
        (walletIdLoaded ? 
            <div>
                <SignUpForm walletId={walletId.toLowerCase()}/>
            </div>
            :
            <h1>Loading...</h1>
        )
    )
}   

export default Index