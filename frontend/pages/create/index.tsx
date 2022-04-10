import { useEffect, useState } from "react";
import { EthProvider } from "../../interfaces/EthProvider";
import axios from "axios";
import ConfirmTransactionModal, { UpdateContractBackendParams } from "../../components/ConfirmTransactionPopup/ConfirmTransactionModal";
import { useRef } from "react";
import { createContractApi } from "../../lib/contract-api";
import { apiRoot } from "../../config";
import { Account } from "../../interfaces/DashboardDetails";
import {useRouter} from "next/router";

const Create = () => {
  const router = useRouter();

  // get all user addresses
  const [users, setUsers] = useState<Account[]>();
  useEffect(()=> {
    axios.get(`${apiRoot}/account/all`, {})
    .then(res => {
      setUsers(res.data);
    })
  }, [])

  const [ethProvider, setEthProvider] = useState<EthProvider|null>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const createContractParams = useRef<UpdateContractBackendParams>();
  const transaction = useRef<string|null>();

  useEffect(() => {
    const ethProv = (window as any).ethereum as EthProvider;
    setEthProvider(ethProv);
  }, []);

  const createContract = async() => {

    var fromAddr:string = userMap[(document.getElementById("from") as HTMLInputElement).value];
    var toAddr:string = userMap[(document.getElementById("to") as HTMLInputElement).value];
    var arbitratorAddr:string = userMap[(document.getElementById("arbitrator") as HTMLInputElement).value];
    console.log(fromAddr);
    console.log(toAddr);
    console.log(arbitratorAddr);

    const payload = {
      deployAddress: ethProvider.selectedAddress,
      fromAddress: fromAddr,
      toAddress: toAddr,
      arbitrator: arbitratorAddr,
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
      fromAddress: fromAddr,
      toAddress: toAddr,
      contractName: (document.getElementById("name") as HTMLInputElement).value,
    }
    popup();
  }

  const popup = () => {
    setModalIsOpen(true);
  }

  if (users === undefined) {
    return (<div>Loading...</div>)
  }

  const userMap = users.reduce((map, user) => {
    map[user.username] = user.walletId;
    return map;
  }, {});

  const returnDash = () => {
      router.push("/dashboard");
  }

  return (
    <div className="m-20 p-20 space-y-4">
      <header className="mb-3 text-2xl font-bold">Create your contract</header>
      <div className="flex flex-row">
        <div className="grid justify-items-center content-center w-1/5">
          <p>Enter Contract Name:</p>
        </div>
        <div className="relative ml-10 w-4/5 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200">
          <input
            id="name"
            type="text"
            required
            placeholder="Contract name"
            className="ml-4 my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            />
        </div>
      </div>

      <div className="flex flex-row">
        <div className="grid justify-items-center content-center w-1/5">
          <p>Select Payer Address:</p>
        </div>
        <div className="relative ml-10 w-4/5 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200">
          <select className="block appearance-none w-full bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
            focus:outline-none focus:bg-white focus:border-gray-500" 
            id="from"
            >
            {users.map(user => (
              <option key={user.walletId}>{user.username}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="grid justify-items-center content-center w-1/5">
          <p>Select Payee Address:</p>
        </div>
        <div className="relative ml-10 w-4/5 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200">
          <select className="block appearance-none w-full bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
            focus:outline-none focus:bg-white focus:border-gray-500" 
            id="to"
            >
            {users.map(user => (
              <option key={user.walletId}>{user.username}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="grid justify-items-center content-center w-1/5">
          <p>Select Arbitrator Address:</p>
        </div>
        <div className="relative ml-10 w-4/5 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200">
          <select className="block appearance-none w-full bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
            focus:outline-none focus:bg-white focus:border-gray-500" 
            id="arbitrator"
            >
            {users.map(user => (
              <option key={user.walletId}>{user.username}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <button
        className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white 
          hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
        onClick={createContract}
      >
        CREATE CONTRACT
      </button>

      <div className="flex justify-center">
        <button
          className="mt-10 p-3 rounded-2xl border-b-4 border-b-teal-600 bg-teal-300 py-3 font-bold text-white 
            hover:bg-teal-400 active:translate-y-[0.125rem] active:border-b-blue-400"
          onClick={returnDash}
        >
          Return to Dashboard 
        </button>        
      </div>

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