import Dashboard from '../../components/Dashboard'
import useWallet from '../../hooks/useWallet';

const Index = () => {

    // get wallet id
    const { isConnected, walletInfo, accountData } = useWallet();

    return (
        (walletInfo && isConnected ? 
            <div className="w-full h-full">
                <Dashboard accountData={accountData} isConnected={isConnected} walletId={walletInfo.selectedAddress.toLowerCase()}/>
            </div>
            :
            <h1>Loading...</h1>
        )
    )
}   

export default Index