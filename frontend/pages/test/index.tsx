import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import { maticToWeiInHex } from "../../lib/blockchain";
import ConfirmTransactionModal, { UpdateContractBackendParams } from "../../components/ConfirmTransactionPopup/ConfirmTransactionModal";
import { useRef } from "react";
import { createContractApi } from "../../lib/contract-api";

const Test = () => {
    const [ethProvider, setEthProvider] = useState<EthProvider|null>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const createContractParams = useRef<UpdateContractBackendParams>();
    const transaction = useRef<string|null>();

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
        
        // Pass variable inputs to child modal
        transaction.current = txHash;
        createContractParams.current = {
            fromAddress: (document.getElementById("from") as HTMLInputElement).value, 
            toAddress: (document.getElementById("to") as HTMLInputElement).value,
            contractName: (document.getElementById("name") as HTMLInputElement).value,
        }
        popup();
        
        // Update database
    }

    const createContractUpdateBackend = async (contractAddress) => {
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

    const popup = () => {
        setModalIsOpen(true);
    }

    const updateBackend = async () => {
        await new Promise(() => setTimeout(() => {console.log("Slept for 3 secs")}, 3000));
        return true;
    }

    return (
        <div>
            <h1>Test page</h1>
            {ethProvider && 
                <div>
                    Connected to metamask: {ethProvider.isMetaMask.toString()} <br/>
                    Address (from Ethereum provider): {ethProvider.selectedAddress} <br/>
                    Contract name: <input id="name" placeholder="Contract name" /> <br/>
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
                    <button onClick={popup} className="bg-button-blue h-10 w-36">Pop up</button> <br/><br/>
                    <ConfirmTransactionModal 
                        contractBackendParams={createContractParams}
                        provider={ethProvider} 
                        updateBackend={createContractApi} 
                        txHash={transaction} 
                        isOpen={modalIsOpen} 
                        onRequestClose={() => {setModalIsOpen(false)}} 
                    />
                </div>
            }
        </div>
    );
}

export default Test