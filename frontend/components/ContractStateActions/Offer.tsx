import {Contract} from '../../interfaces/DashboardDetails';
import {offerContractApi} from '../../lib/contract-api';
import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import { maticToWeiInHex } from "../../lib/blockchain";
import ConfirmTransactionModal, { UpdateContractBackendParams } from "../../components/ConfirmTransactionPopup/ConfirmTransactionModal";
import { useRef } from "react";

interface Props {
    contract: Contract;
}

const Offer = (props:Props) => {
    const [ethProvider, setEthProvider] = useState<EthProvider|null>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const createContractParams = useRef<UpdateContractBackendParams>();
    const transaction = useRef<string|null>();

    useEffect(() => {
        const ethProv = (window as any).ethereum as EthProvider;
        setEthProvider(ethProv);
    }, []);

    const callOffer = async () => {
        const res = await axios.post("http://localhost:5000/blockchain/offer", {
            callerAddress: ethProvider.selectedAddress,
            contractAddress: props.contract.address,
            expiryTime: 1659135249,
            value: maticToWeiInHex((document.getElementById("offeramt") as HTMLInputElement).value),
        });
        const tx = res. data;
        console.log(tx);
        const txHash = await ethProvider.request({
            method: 'eth_sendTransaction',
            params: [tx],
        });
        console.log(txHash);
    }

    return (
        <>
            <div className="flex justify-center m-5">
                <p className="flex self-center">Input offer amount: </p>
                <input className="m-3 outline-0" id="offeramt" placeholder={"amount"} />
            </div>     
            <div className="flex justify-center">
                <button
                    className="mb-5 text-black bg-green-200
                    hover:bg-green-400 focus:ring-4 focus:ring-transparent 
                    font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
                    onClick={callOffer}
                    >
                    Offer
                </button>               
            </div>
            <ConfirmTransactionModal 
                contractBackendParams={createContractParams}
                provider={ethProvider} 
                updateBackend={offerContractApi} 
                txHash={transaction} 
                isOpen={modalIsOpen} 
                onRequestClose={() => {setModalIsOpen(false)}} 
            />
        </>

    )
}

export default Offer