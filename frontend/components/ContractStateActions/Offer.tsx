import {Contract} from '../../interfaces/DashboardDetails';
import {offerContractApi} from '../../lib/contract-api';
import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import { maticToWeiInHex } from "../../lib/blockchain";
import ConfirmTransactionModal from "../../components/ConfirmTransactionPopup/ConfirmTransactionModal";
import { useRef } from "react";
import {apiRoot} from "../../config";

interface Props {
    contract: Contract;
}

const Offer = (props:Props) => {

    // get date and add 6 months for default contract expiry date
    /*
    var date = new Date()
    date.setMonth(date.getMonth() + 6)
    var unixDate:number = Math.floor(date.getTime() / 1000)
    console.log(unixDate)
    */

    const [ethProvider, setEthProvider] = useState<EthProvider|null>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const transaction = useRef<string|null>();

    useEffect(() => {
        const ethProv = (window as any).ethereum as EthProvider;
        setEthProvider(ethProv);
    }, []);

    const callOffer = async () => {
        var date = new Date((document.getElementById("expiry") as HTMLInputElement).value)
        var unixDate:number = Math.floor(date.getTime() / 1000)

        const res = await axios.post(`${apiRoot}/blockchain/offer`, {
            callerAddress: ethProvider.selectedAddress,
            contractAddress: props.contract.address,
            expiryTime: unixDate,
            value: maticToWeiInHex((document.getElementById("offeramt") as HTMLInputElement).value),
        });
        const tx = res.data;
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
                    <p className="flex self-center">Input expiry date: </p>
                    <input type="date" className="m-3 outline-0 border rounded p-1" id="expiry" />
                </div>     
                <div className="flex justify-center m-5">
                    <p className="flex self-center">Input offer amount: </p>
                    <input className="m-3 outline-0 border rounded p-1" id="offeramt" placeholder={"amount"} />
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
                    provider={ethProvider} 
                    updateBackend={offerContractApi} 
                    txHash={transaction} 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => {setModalIsOpen(false)}} 
                    contractAddress={props.contract.address}
                    fromAddress={props.contract.payer.walletId}
                />
            </>

        )
    }
    return (<div>Loading...</div>)
}

export default Offer