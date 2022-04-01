import { useState } from "react";
import ReactModal from "react-modal";
import styles from "../../styles/TransactionModal.module.css";
import { MutableRefObject } from "react";
import TransactionError from "./TransactionError";
import { EthProvider } from "../../interfaces/EthProvider";
import ConfirmTransaction from "./ConfirmTransaction";
import TransactionComplete from "./TransactionComplete";

export interface UpdateContractBackendParams {
    fromAddress: string,
    toAddress: string,
    contractName: string, 
}

interface Props {
    isOpen: boolean,
    onRequestClose: () => void,
    // Transaction hash is passed via a ref 
    txHash: MutableRefObject<string|null>,
    updateBackend: (contractAddress: string, fromAddress: string, toAddress?: string, contractName?: string) => Promise<boolean>;
    provider: EthProvider;
    // Only used for contract creation
    contractBackendParams?: MutableRefObject<UpdateContractBackendParams>,
    // The following two props must be provided for calls other than contract creation
    contractAddress?: string;
    fromAddress?: string;
}

const ConfirmTransactionModal = (props: Props) => {
    const [transactionComplete, setTransactionComplete] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // Wrapper around onRequestClose to disallow user from closing before transaction goes through
    const closeModal = () => {
        if (transactionComplete || error) {
            props.onRequestClose();
        }
    }

    // Callback function that updates backend 
    const update = async (contractAddress: string) => {
        var success;
        if (props.contractBackendParams) {
            const { fromAddress, toAddress, contractName } = props.contractBackendParams.current;
            success = await props.updateBackend(contractAddress, fromAddress, toAddress, contractName);
        } else {
            success = await props.updateBackend(props.contractAddress, props.fromAddress);
        }
        if (success) 
            setTransactionComplete(true);
        else
            setError(true);
    }

    const onModalOpen = () => {
        // Perform check that txHash is set
        if (!props.txHash.current) 
            setError(true);
        else
            setError(false);
    }

    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={closeModal}
            closeTimeoutMS={400}
            className={styles.content}
            onAfterOpen={onModalOpen}
        >
            {error ?
                <TransactionError errorMsg="Something went wrong..." />
                :
                    !transactionComplete ? 
                        <ConfirmTransaction
                            txHash={props.txHash.current}
                            provider={props.provider}
                            callback={update}
                        /> 
                        : 
                            <TransactionComplete />
            }
        </ReactModal>
    );
}
export default ConfirmTransactionModal;