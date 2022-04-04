import { useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard'
import { EthProvider } from '../../interfaces/EthProvider';

const Index = () => {

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
                <Dashboard walletId={walletId.toLowerCase()}/>
            </div>
            :
            <h1>Loading...</h1>
        )
    )
}   

export default Index