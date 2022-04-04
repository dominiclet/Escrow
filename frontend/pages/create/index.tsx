import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import ConfirmTransactionModal, { UpdateContractBackendParams } from "../../components/ConfirmTransactionPopup/ConfirmTransactionModal";
import { useRef } from "react";
import { createContractApi } from "../../lib/contract-api";
import { apiRoot } from "../../config";

const Create = () => {

  const [ethProvider, setEthProvider] = useState<EthProvider|null>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const createContractParams = useRef<UpdateContractBackendParams>();
  const transaction = useRef<string|null>();

  useEffect(() => {
    const ethProv = (window as any).ethereum as EthProvider;
    setEthProvider(ethProv);
  }, []);

  const createContract = async() => {
    const payload = {
      deployAddress: ethProvider.selectedAddress,
      fromAddress: (document.getElementById("from") as HTMLInputElement).value, 
      toAddress: (document.getElementById("to") as HTMLInputElement).value,
      arbitrator: (document.getElementById("arbitrator") as HTMLInputElement).value,
    };

    // create contract on blockchain
    const res = await axios.post(`${apiRoot}/blockchain/create`, payload);
    const tx = res.data;
    const txHash = await ethProvider.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    // pass variable inputs to child modal
    transaction.current = txHash;
    createContractParams.current = {
      fromAddress: (document.getElementById("from") as HTMLInputElement).value, 
      toAddress: (document.getElementById("to") as HTMLInputElement).value,
      contractName: (document.getElementById("name") as HTMLInputElement).value,
    }
    popup();
  }

  const popup = () => {
    setModalIsOpen(true);
  }

  return (
    <div className="m-20 p-20 space-y-4">
      <header className="mb-3 text-2xl font-bold">Create your contract</header>
      <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200">
        <input
          id="name"
          type="text"
          placeholder="Contract name"
          className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
        />
      </div>
      <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200">
        <input
          id="from"
          type="text"
          placeholder="Address from"
          className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
        />
      </div>
      <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200">
        <input
          id="to"
          type="text"
          placeholder="Address to"
          className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
        />
      </div>
      <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200">
        <input
          id="arbitrator"
          type="text"
          placeholder="Arbitrator address"
          className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
        />
      </div>
      <button
        className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white 
          hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
        onClick={createContract}
      >
        CREATE CONTRACT
      </button>
      <ConfirmTransactionModal 
        contractBackendParams={createContractParams}
        provider={ethProvider} 
        updateBackend={createContractApi} 
        txHash={transaction} 
        isOpen={modalIsOpen} 
        onRequestClose={() => {setModalIsOpen(false)}} 
      />
    </div>
  )
}

export default Create