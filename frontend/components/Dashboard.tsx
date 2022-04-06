import axios from 'axios';
import {useEffect, useState} from 'react';
import Table from './Table';
import { apiRoot } from '../config';
import { Account, Contract, ContractState } from '../interfaces/DashboardDetails';
import { useRouter } from 'next/router';
import AccountInfo from './AccountInfo';

////////////////////// test data ///////////////////////

var Richardt: Account = {
    "walletId":"0x1234567890000000000000000000000000000",
    "username":"Richardt Alaindt"
}

var John: Account = {
    walletId: "0x0fb0a65ca2c3f9b35d6803cff13c01b7624439d7",
    username: "John"
}
var Jayesh: Account = {
    walletId: "0x83457",
    username: "Jayesh"
}
/*
var testContractDetails: Array<Contract> = Array(
    {"payer": John, "payee": Jayesh, "name": "Contract for stripper", "address":"0x12345", "state": ContractState.A_ACCEPTANCE},
    {"payer": Jayesh, "payee": John, "name": "Contract for goods", "address":"0x42342", "state": ContractState.COMPLETE},
);
*/

var accountDetails: Array<Account> = Array(
    {"walletId": "0x28341234", "username": "john"},
    John,
    Jayesh
);

var currentUser = John
////////////////////////////////////////////////////////

interface Props {
    walletId: string;
    isConnected: boolean;
    accountData: Account;
}

const Dashboard = (props: Props) => {
    const router = useRouter();
    const { isConnected, accountData } = props;

    // get user account
    const [userLoaded, setUserLoaded] = useState<boolean>();
    const [user, setUser] = useState<Account>();
    
    useEffect(() => {
        if (accountData) {
            setUser(accountData);
            setUserLoaded(true);
        }
    }, [accountData])

    // get payer contracts 
    const [payerDataLoaded, setPayerDataLoaded] = useState<boolean>();
    const [payerContractData, setPayerContractData] = useState<Array<Contract>>();
    useEffect(() => {
        if (isConnected) {
            axios.get(`${apiRoot}/contract/payer/${props.walletId}`, {})
            .then(res => {
                setPayerContractData(res.data);
                setPayerDataLoaded(true);
            })
        }
    }, [isConnected])
    
    // get payee contracts
    const [payeeDataLoaded, setPayeeDataLoaded] = useState<boolean>();
    const [payeeContractData, setPayeeContractData] = useState<Array<Contract>>();
    useEffect(() => {
        if (isConnected) {
            axios.get(`${apiRoot}/contract/payee/${props.walletId}`, {})
            .then(res => {
                setPayeeContractData(res.data);
                setPayeeDataLoaded(true);
            })
        }
    }, [isConnected])

    // logout button function
    
    // create a new contract button function
    const createContract = () => {
        router.push("/create");
    }

    return (
        (payeeDataLoaded && payerDataLoaded && userLoaded ?
            <div className="flex h-full w-full bg-background">
                <div className="flex flex-col w-screen m-10">
                    <div className="flex flex-row flow-root p-10">
                        <p className="float-left font-bold text-xl">Overview</p>
                        <AccountInfo user={user}/>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="self-center text-white bg-gray hover:bg-black 
                            rounded-full px-4 py-4 text-sm"
                            onClick={createContract}
                            >
                            CREATE A NEW CONTRACT
                        </button>
                    </div>
                    <div className="p-10">
                        <Table role="Purchaser" contractDetails={payerContractData} user={user}/>
                        <Table role="Service Provider" contractDetails={payeeContractData} user={user}/>
                    </div>
                </div>
            </div>            
            :
            <h1>Loading...</h1>
        )
    )
}

export default Dashboard
