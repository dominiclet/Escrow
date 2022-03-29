import { useEffect, useState } from "react";
import useInterval from "../hooks/useInterval";
import { EthProvider } from "../interfaces/EthProvider";
import { TransactionReceipt } from "../interfaces/TransactionReceipt";

interface Props {
    txHash: string;
    provider: EthProvider;
}

const ConfirmTransaction = (props: Props) => {
    const [txReceipt, setTxReceipt] = useState<TransactionReceipt|null>();
    const ethProvider = props.provider;

    useEffect(() => {
        if (txReceipt) {
            console.log(txReceipt);
            console.log("Update database now");
        }
    }, [txReceipt]);

    useInterval(async () => {
        const receipt = await ethProvider.request({
            method: 'eth_getTransactionReceipt', 
            params: [props.txHash], 
        });
        setTxReceipt(receipt);
    }, txReceipt ? null : 5000);

    if (!txReceipt)
        return (
            <div>
                Confirming your transaction on the blockchain... <br/>
                Please do not close the tab
            </div>
        );
    return (
        <div>
            Your transaction is now confirmed.
        </div>
    );
}
export default ConfirmTransaction;