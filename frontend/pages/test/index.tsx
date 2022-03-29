import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import ConfirmTransaction from "../../components/ConfirmTransaction";

const Test = () => {
    const [ethProvider, setEthProvider] = useState<EthProvider|null>();
    const [txHash, setTxHash] = useState<string|null>();

    useEffect(() => {
        const ethProv = (window as any).ethereum as EthProvider;
        setEthProvider(ethProv);
    }, []);

    const createContract = async () => {
        const res = await axios.post("http://localhost:5000/blockchain/create", {
            deployAddress: ethProvider.selectedAddress,
            fromAddress: (document.getElementById("from") as HTMLInputElement).value, 
            toAddress: (document.getElementById("to") as HTMLInputElement).value,
            arbitrator: (document.getElementById("arbitrator") as HTMLInputElement).value,
        });
        const tx = res.data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        setTxHash(txHash);

        // Update database
    }

    if (!txHash) 
        return (
            <div>
                <h1>Test page</h1>
                {ethProvider && 
                    <div>
                        Connected to metamask: {ethProvider.isMetaMask.toString()} <br/>
                        Address (from Ethereum provider): {ethProvider.selectedAddress} <br/>
                        Transaction from: <input id="from" placeholder={"from address"} /> <br/>
                        Transaction to: <input id="to" placeholder={"to address"} /> <br/>
                        Arbitrator: <input id="arbitrator" placeholder={"arbitrator's address"} /> <br />
                        <button onClick={createContract} className="bg-button-blue h-10 w-36">Deploy contract</button>
                    </div>
                }
            </div>
        );
    return (
        <ConfirmTransaction txHash={txHash} provider={ethProvider} />
    );
}

export default Test