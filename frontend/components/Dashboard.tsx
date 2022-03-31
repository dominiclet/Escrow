import axios from 'axios';
import {useEffect, useState} from 'react';
import Table from './Table';
import { apiRoot } from '../config';
import { Account, Contract, ContractState } from '../interfaces/DashboardDetails';

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

interface Props {
    walletId: string;
}

const Dashboard = (props: Props) => {
    // get payer contracts 
    const [payerDataLoaded, setPayerDataLoaded] = useState<boolean>();
    const [payerContractData, setPayerContractData] = useState<Array<Contract>>();
    useEffect(() => {
        axios.get(`${apiRoot}/contract/payer/${currentUser.walletId}`, {})
        .then(res => {
            setPayerContractData(res.data);
            setPayerDataLoaded(true);
            console.log(res.data);
            console.log(currentUser.walletId);
            console.log(props.walletId);
            console.log(props.walletId === currentUser.walletId);
        })
    }, [])
    
    // get payee contracts
    const [payeeDataLoaded, setPayeeDataLoaded] = useState<boolean>();
    const [payeeContractData, setPayeeContractData] = useState<Array<Contract>>();
    useEffect(() => {
        axios.get(`${apiRoot}/contract/payee/${props.walletId}`, {})
        .then(res => {
            setPayeeContractData(res.data);
            setPayeeDataLoaded(true);
        })
    }, [])

    // get user account
    const [userLoaded, setUserLoaded] = useState<boolean>();
    const [user, setUser] = useState<Account>();
    useEffect(() => {
        axios.get(`${apiRoot}/account/${currentUser.walletId}`, {})
        .then(res => {
            setUser(res.data);
            setUserLoaded(true);
        })
    }, [])

    // logout button function
    
    // create a new contract button function

    // view contract button function

    return (
        (payeeDataLoaded && payerDataLoaded && userLoaded ?
            <div className="flex h-screen w-screen bg-background">
                <div className="flex flex-col w-screen m-10">
                    <div className="flex flex-row flow-root p-10">
                        <p className="float-left font-bold text-xl">Overview</p>
                        <div className="float-right">
                            <div className="grid grid-cols-3 gap-4">
                                <p className="flex justify-end">{user.username}</p>
                                <p className="flex jusitfy-end">{props.walletId.slice(0,5) + '...' + props.walletId.slice(-3)}</p>
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
                        <Table role="Purchaser" contractDetails={payerContractData} user={currentUser}/>
                        <Table role="Service Provider" contractDetails={payeeContractData} user={currentUser}/>
                    </div>
                </div>
            </div>            
            :
            <h1>Loading...</h1>
        )
    )
}

export default Dashboard
