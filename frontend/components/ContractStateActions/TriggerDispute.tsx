import {Contract} from '../../interfaces/DashboardDetails';
import {triggerDisputeApi} from '../../lib/contract-api';
import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import ConfirmTransactionModal from "../ConfirmTransactionPopup/ConfirmTransactionModal";
import { useRef } from "react";
import {apiRoot} from "../../config";

interface Props {
    contract: Contract;
}

const TriggerDispute = (props:Props) => {
    const [ethProvider, setEthProvider] = useState<EthProvider|null>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const transaction = useRef<string|null>();

    useEffect(() => {
        const ethProv = (window as any).ethereum as EthProvider;
        setEthProvider(ethProv);
    }, []);

    const callFunc = async () => {
        const res = await axios.post(`${apiRoot}/blockchain/triggerDispute`, {
            callerAddress: ethProvider.selectedAddress,
            contractAddress: props.contract.address,
        });
        const tx = res. data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        console.log(txHash);

        transaction.current = txHash;
        popup();
    }

    const popup = () => {
        setModalIsOpen(true);
    }

    if (ethProvider) {
        return (
            <>
                <div className="flex justify-center">
                    <button
                        className="mb-5 text-black bg-red-200
                        hover:bg-red-400 focus:ring-4 focus:ring-transparent 
                        font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
                        onClick={callFunc}
                        >
                        Trigger Dispute
                    </button>               
                </div>
                <ConfirmTransactionModal 
                    provider={ethProvider} 
                    updateBackend={triggerDisputeApi} 
                    txHash={transaction} 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => {setModalIsOpen(false)}} 
                    contractAddress={props.contract.address}
                    fromAddress={ethProvider.selectedAddress}
                />
            </>

        )
    }
    return (<div>Loading...</div>)

}

export default TriggerDispute