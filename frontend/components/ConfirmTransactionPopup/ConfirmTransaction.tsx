import { useEffect, useState } from "react";
import useInterval from "../../hooks/useInterval";
import { EthProvider } from "../../interfaces/EthProvider";
import { TransactionReceipt } from "../../interfaces/TransactionReceipt";
import PacmanLoader from "react-spinners/PacmanLoader";

interface Props {
    txHash: string;
    provider: EthProvider;
    callback: (contractAddress: string) => void;
}

const ConfirmTransaction = (props: Props) => {
    const [txReceipt, setTxReceipt] = useState<TransactionReceipt|null>();
    const ethProvider = props.provider;

    useEffect(() => {
        if (txReceipt) {
            console.log(txReceipt);
            console.log("Update database now");
            props.callback(txReceipt.contractAddress);
        }
    }, [txReceipt]);

    useInterval(async () => {
        const receipt = await ethProvider.request({
            method: 'eth_getTransactionReceipt', 
            params: [props.txHash], 
        });
        setTxReceipt(receipt);
    }, txReceipt ? null : 5000);

    return (
        <div className="flex flex-col">
            <p className="text-xl font-bold text-center m-9">Your transaction is underway</p>
            <div className="self-center w-32 h-32 my-10">
                <PacmanLoader
                    color="#36D7B7"
                    size={50}
                />
            </div>
            <p className="text-lg text-center">Please do not close the tab</p>
        </div>
    );
}
export default ConfirmTransaction;