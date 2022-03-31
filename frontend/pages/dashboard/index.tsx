import Table from '../../components/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Account, Contract, ContractState } from '../../interfaces/DashboardDetails';
import { MetaMaskInpageProvider } from "@metamask/providers";

////////////////////// test data ///////////////////////

var Richardt: Account = {
    "walletId":"0x1234567890000000000000000000000000000",
    "username":"Richardt Alaindt"
}

var John: Account = {
    walletId: "0x0fB0A65ca2c3f9B35d6803cFf13C01B7624439d7",
    username: "John"
}
var Jayesh: Account = {
    walletId: "0x83457",
    username: "Jayesh"
}
var testContractDetails: Array<Contract> = Array(
    {"payer": John, "payee": Jayesh, "name": "Contract for stripper", "address":"0x12345", "state": ContractState.A_ACCEPTANCE},
    {"payer": Jayesh, "payee": John, "name": "Contract for goods", "address":"0x42342", "state": ContractState.COMPLETE},
);

var accountDetails: Array<Account> = Array(
    {"walletId": "0x28341234", "username": "john"},
    John,
    Jayesh
);

var currentUser = John
////////////////////////////////////////////////////////

const Index = () => {

    /*
    // get user's walletId and account
    const [walletId, setWalletId] = useState<string>();
    const [currentUser, setCurrentUser] = useState<Account>();
    const loadMetamask = async () => {
        const accounts = await ethereum.request<string[]>( {method: 'eth_requestAccounts'});
        if (accounts) {
            console.log(accounts[0]);
            axios.get(`http://localhost:5000/account/${accounts}[0])`, {})
            .then(res => {
                setCurrentUser(res)
            })
        }
    }
    loadMetamask()
    */

    // get payer contracts 
    const [payerContractData, setPayerContractData] = useState<Array<Contract>>();
    useEffect(() => {
        axios.get(`http://localhost:5000/contract/payer/${currentUser.walletId}`, {})
        .then(res => {
            setPayerContractData(res.data);
            console.log(res)
        })
    }, [])
    
    // get payee contracts
    const [payeeContractData, setPayeeContractData] = useState<Array<Contract>>();
    useEffect(() => {
        axios.get(`http://localhost:5000/contract/payee/${currentUser.walletId}`, {})
        .then(res => {
            setPayeeContractData(res.data);
            console.log(res)
        })
    }, [])

    return (
        <div className="flex h-screen w-screen bg-background">
            <div className="flex flex-col w-screen m-10">
                <div className="flex flex-row flow-root p-10">
                    <p className="float-left font-bold text-xl">Overview</p>
                    <div className="float-right">
                        <div className="grid grid-cols-3 gap-4">
                            <p>Account name</p>
                            <p>Wallet address</p>
                            <button 
                                className="text-black bg-red-300
                                hover:bg-red-400 focus:ring-4 focus:ring-transparent 
                                font-medium rounded-full text-base w-full sm:w-auto text-center"
                                >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="self-center text-white bg-gray hover:bg-black 
                        rounded-full px-4 py-4 text-sm"
                        >
                        CREATE A NEW CONTRACT
                    </button>
                </div>
                <div className="p-10">
                    <Table role="Purchaser" contractDetails={testContractDetails} user={currentUser}/>
                    <Table role="Service Provider" contractDetails={testContractDetails} user={currentUser}/>
                </div>
            </div>
        </div>
    )
}   

export default Index