import { useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard'

const Index = () => {

    // get wallet id
    const [walletIdLoaded, setWalletIdLoaded] = useState<boolean>();
    const [walletId, setWalletId] = useState<string>();
    useEffect(() => {
        const fetchUser = async() => {
            var accounts = await ethereum.request<string[]>( {method: 'eth_requestAccounts'});
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
                <Dashboard walletId={walletId}/>
                <h1>{walletId}</h1>                
            </div>

            :
            <h1>Loading...</h1>
        )
        
    )
}   

export default Index