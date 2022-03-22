import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import { ethers } from "ethers";

const Test = () => {
    const [ethProvider, setEthProvider] = useState<EthProvider|null>();
    const [ethersProvider, setEthersProvider] = useState<ethers.providers.Web3Provider|null>();
    const [signer, setSigner] = useState();

    useEffect(() => {
        const ethProv = (window as any).ethereum as EthProvider;
        const provider = new ethers.providers.Web3Provider(ethProv);
        setEthersProvider(provider);
        setEthProvider(ethProv);
    }, []);

    const createContract = async () => {
        const res = await axios.post("http://localhost:5000/contract/create", {
            deployAddress: ethProvider.selectedAddress,
            fromAddress: (document.getElementById("from") as HTMLInputElement).value, 
            toAddress: (document.getElementById("to") as HTMLInputElement).value,
        });
        const tx = res.data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        })
        // Update database
    }

    return (
        <div>
            <h1>Test page</h1>
            {ethProvider && 
                <div>
                    Connected to metamask: {ethProvider.isMetaMask.toString()} <br/>
                    Address (from Ethereum provider): {ethProvider.selectedAddress} <br/>
                    Transaction from: <input id="from" placeholder={"from address"} /> <br/>
                    Transaction to: <input id="to" placeholder={"to address"} /> <br/>
                    <button onClick={createContract} className="bg-button-blue h-10 w-36">Deploy contract</button>
                </div>
            }
        </div>
    );
}

export default Test