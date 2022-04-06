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
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
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
                    console.log('here')
                    const res = await axios.get(`${apiRoot}/account/${ethProvider.selectedAddress}`);
                    // If current page is registration page, redirect to dashbaord
                    if (res.status == 200) {
                        if (router.pathname = "/signup") {
                            console.log("LKSDFJ")
                            router.push("/dashboard");
                        }
                        setIsRegistered(true);
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response.status == 404 && router.pathname != "/signup")
                        router.push("/signup");
                    return false;
                }

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
        isRegistered,
    }
}
export default useWallet;