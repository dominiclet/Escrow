import {Contract} from '../../interfaces/DashboardDetails';
import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import ConfirmTransactionModal from "../ConfirmTransactionPopup/ConfirmTransactionModal";
import { useRef } from "react";
import {apiRoot} from "../../config";

interface Props {
    contract: Contract;
}

const ExtendExpiry = (props:Props) => {
    const [ethProvider, setEthProvider] = useState<EthProvider|null>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const transaction = useRef<string|null>();

    useEffect(() => {
        const ethProv = (window as any).ethereum as EthProvider;
        setEthProvider(ethProv);
    }, []);

    const callFunc = async () => {
        var date = new Date((document.getElementById("expiry") as HTMLInputElement).value)
        var unixDate:number = Math.floor(date.getTime() / 1000)

        const res = await axios.post(`${apiRoot}/blockchain/extendExpiry`, {
            callerAddress: ethProvider.selectedAddress,
            contractAddress: props.contract.address,
            proposedExpiry: unixDate,
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
                <div className="flex justify-center m-5">
                    <p className="flex self-center">Input expiry extention time: </p>
                    <input type="date" className="m-3 outline-0 border rounded p-1" id="expiry" />
                </div>     
                <div className="flex justify-center">
                    <button
                        className="mb-5 text-black bg-green-200
                        hover:bg-green-400 focus:ring-4 focus:ring-transparent 
                        font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
                        onClick={callFunc}
                        >
                        Extend Expiry
                    </button>               
                </div>
                <ConfirmTransactionModal 
                    provider={ethProvider} 
                    txHash={transaction} 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => {setModalIsOpen(false)}} 
                />
            </>

        )
    }
    return (<div>Loading...</div>)
}

export default ExtendExpiry 
