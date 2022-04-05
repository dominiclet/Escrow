import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiRoot } from "../config";
import { EthProvider } from "../interfaces/EthProvider";

interface WalletInfo {
    networkVersion:string,
    selectedAddress: string,
}

const useWallet = () => {
    const [ethProvider, setEthProvider] = useState<EthProvider|null>();
    const [ethProviderPresent, setEthProviderPresent] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [walletInfo, setWalletInfo] = useState<WalletInfo|null>();
    const router = useRouter();

    useEffect(() => {
        const ethProvider = (window as any).ethereum as EthProvider;
        setEthProvider(ethProvider);

        if (!ethProvider) 
            return;

        setEthProviderPresent(true);
        setWalletInfo({
            networkVersion: ethProvider.networkVersion,
            selectedAddress: ethProvider.selectedAddress,
        });

        const checkAddressExists = async () => {
            if (ethProvider.selectedAddress) {
                try {
                    const res = await axios.get(`${apiRoot}/account/${ethProvider.selectedAddress}`);
                } catch (e) {
                    console.log(e);
                    router.push("/create");
                }
            }
        }

        checkAddressExists();

        if (!ethProvider.selectedAddress) {
            setIsConnected(true);
        }
    }, []);

    const requestConnect = async () => {
        const accounts = await ethProvider.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        // Check if account exists on the backend

        try {
            const res = await axios.get(`${apiRoot}/account/${account}`);
        } catch (e) {
            router.push('/create');
        }
    }
    
    return {
        ethProvider,
        ethProviderPresent,
        requestConnect,
        walletInfo,
        isConnected,
    }
}
export default useWallet;