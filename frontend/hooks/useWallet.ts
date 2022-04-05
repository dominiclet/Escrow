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
                    if (e.response.status == 404)
                        router.push("/signup");
                }

                // If current page is registration page, redirect to dashbaord
                if (router.pathname = "/signup")
                    router.push("/dashboard");
            }
        }

        checkAddressExists();

        if (ethProvider.selectedAddress) {
            setIsConnected(true);
        }
    }, []);

    const requestConnect = async () => {
        var accounts;
        try {
            accounts = await ethProvider.request({ method: "eth_requestAccounts" });
        } catch (e) {
            console.log(e);
            return;
        }

        const account = accounts[0];
        setIsConnected(true);
        // Check if account exists on the backend

        try {
            const res = await axios.get(`${apiRoot}/account/${account}`);
        } catch (e) {
            router.push('/signup');
        }

        return account;
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