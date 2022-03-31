import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import ConfirmTransaction from "../../components/ConfirmTransaction";
import { maticToWeiInHex } from "../../lib/blockchain";

const Test = () => {
    const [ethProvider, setEthProvider] = useState<EthProvider|null>();
    const [txHash, setTxHash] = useState<string|null>();

    useEffect(() => {
        const ethProv = (window as any).ethereum as EthProvider;
        setEthProvider(ethProv);
    }, []);

    const createContract = async () => {
        const payload = {
            deployAddress: ethProvider.selectedAddress,
            fromAddress: (document.getElementById("from") as HTMLInputElement).value, 
            toAddress: (document.getElementById("to") as HTMLInputElement).value,
            arbitrator: (document.getElementById("arbitrator") as HTMLInputElement).value,
        }
        console.log(payload);
        const res = await axios.post("http://localhost:5000/blockchain/create", payload);
        const tx = res.data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        setTxHash(txHash);

        // Update database
    }

    const callOffer = async () => {
        const res = await axios.post("http://localhost:5000/blockchain/offer", {
            callerAddress: ethProvider.selectedAddress,
            contractAddress: (document.getElementById("contractAddr") as HTMLInputElement).value,
            expiryTime: 1659135249,
            value: maticToWeiInHex((document.getElementById("offeramt") as HTMLInputElement).value),
        });
        const tx = res. data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
    }

    const withdrawOffer = async () => {
        const res = await axios.post("http://localhost:5000/blockchain/withdrawOffer", {
            callerAddress: ethProvider.selectedAddress,
            contractAddress: (document.getElementById("contractAddr") as HTMLInputElement).value,
        });
        const tx = res.data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        console.log(txHash);
    }

    const accept = async () => {
        const res = await axios.post("http://localhost:5000/blockchain/accept", {
            callerAddress: ethProvider.selectedAddress,
            contractAddress: (document.getElementById("contractAddr") as HTMLInputElement).value,
        });
        const tx = res.data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        console.log(txHash);
    }

    const triggerDispute = async () => {
        const res = await axios.post("http://localhost:5000/blockchain/triggerDispute", {
            callerAddress: ethProvider.selectedAddress,
            contractAddress: (document.getElementById("contractAddr") as HTMLInputElement).value,
        });
        const tx = res.data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        console.log(txHash);
    }

    const proposeExpiry = async () => {
        const res = await axios.post("http://localhost:5000/blockchain/extendExpiry", {
            callerAddress: ethProvider.selectedAddress,
            contractAddress: (document.getElementById("contractAddr") as HTMLInputElement).value,
            proposedExpiry: parseInt((document.getElementById('proposedExpiry') as HTMLInputElement).value),
        });
        const tx = res.data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        console.log(txHash);
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
                        <h2>For calling functions</h2>
                        Contract address: <input id="contractAddr" placeholder={"address"} /> <br/>
                        Offer amount: <input id="offeramt" placeholder={"amount"} /> <br/>
                        <button onClick={callOffer} className="bg-button-blue h-10 w-36">Call offer</button> <br/> <br/>
                        <button onClick={withdrawOffer} className="bg-button-blue h-10 w-36">Withdraw offer</button> <br/><br/>
                        <button onClick={accept} className="bg-button-blue h-10 w-36">accept offer</button> <br/><br/>
                        <button onClick={triggerDispute} className="bg-button-blue h-10 w-36">Trigger dispute</button> <br/><br/>
                        Propose expiry: <input id="proposedExpiry" placeholder={"expiry date"} /> <br/>
                        <button onClick={proposeExpiry} className="bg-button-blue h-10 w-36">Propose expiry</button> <br/><br/>
                    </div>
                }
            </div>
        );
    return (
        <ConfirmTransaction txHash={txHash} provider={ethProvider} />
    );
}

export default Test