import StepperComponent from "./StepperComponent";
import AccountInfo from "./AccountInfo";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiRoot } from '../config';
import {Contract, Account, ContractState} from '../interfaces/DashboardDetails';
import DisplayButtons from '../components/ContractStateActions/DisplayButtons';
import {useRouter} from 'next/router';

interface Props {
    walletId: string;
    contract: Contract;
}

const counterPartyName = (user: Account, contract: Contract): string => {
    if (user.username === contract.payee.username) {
        return contract.payer.username;
    } else {
        return contract.payee.username;
    }
}

const Contract = (props:Props) => {
    const router = useRouter();
    const returnDash = () => {
        router.push("/dashboard");
    }

    // get user account
    const [user, setUser] = useState<Account>();
    useEffect(() => {
        axios.get(`${apiRoot}/account/${props.walletId}`, {})
        .then(res => {
            setUser(res.data);
        })
    }, [])

    // get expiry time - need convert to date
    const [expiry, setExpiry] = useState<number>();
    useEffect(()=> {
        axios.get(`${apiRoot}/blockchain/${props.contract.address}/expiryTime`, {})
        .then(res => {
            setExpiry(res.data);
        })
    }, [])

    return (
        ((user === undefined) ? 
            <div>
                <h1>Loading User Data...</h1>
            </div>
            :
            <div className="flex h-screen w-screen bg-background">
                <div className="flex flex-col w-screen m-10">
                    <div className="flex flex-row flow-root p-10">
                        <h1 className="float-left font-bold text-xl">Contract Overview</h1>
                        <AccountInfo user={user}/>
                    </div>
                    <div className="flex flex-col align-center m-10">
                        <table className="bg-[#FFF] w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">Contract Information</th>
                                </tr>
                            </thead>
                            <tbody className="white">
                                <tr className="text-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <p className="font-semibold text-black font-semibold">Contract Name</p>
                                        </div>
                                    </td>                    
                                    <td className="px-4 py-3 text-xs">
                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                            {props.contract.name}
                                        </span>
                                    </td>
                                </tr>
                                <tr className="text-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <p className="font-semibold text-black font-semibold">Counter Party Name</p>
                                        </div>
                                    </td>                    
                                    <td className="px-4 py-3 text-xs">
                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-50 rounded-sm">
                                            {counterPartyName(user, props.contract)}
                                        </span>
                                    </td>
                                </tr>
                                <tr className="text-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <p className="font-semibold text-black font-semibold">Contract Address</p>
                                        </div>
                                    </td>                    
                                    <td className="px-4 py-3 text-xs">
                                        <span className="px-2 py-1 font-medium leading-tight text-green-700 bg-green-20 rounded-sm">{props.contract.address}</span>
                                    </td>
                                </tr>
                                <tr className="text-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <p className="font-semibold text-black font-semibold">Completion Date</p>
                                        </div>
                                    </td>                    
                                    <td className="px-4 py-3 text-xs">
                                        <span className="px-2 py-1 font-medium leading-tight text-green-700 bg-green-20 rounded-sm">{expiry}</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody className="flex flex-row justify-center">
                            </tbody>
                        </table>

                        <div className="bg-[#FFF] w-full mt-10">
                            <div className="text-gray-700">
                                <p className="font-semibold text-black font-semibold px-4 py-3">Current Contract State</p>          
                            </div>
                            <StepperComponent state={props.contract.state}/>
                        </div>          
                        <div className="bg-[#FFF] w-full mt-10 text-gray-700">
                            <div className="px-4 py-3">
                                <p className="justify-center font-semibold text-black font-semibold">Actions to be Taken</p>
                            </div>        
                            <DisplayButtons user={user} contract={props.contract}/>            
                        </div>
                    </div>
                    <div>
                        <button
                            className="mb-5 ml-10 text-black bg-teal-100
                            hover:bg-teal-500 focus:ring-4 focus:ring-transparent 
                            font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
                            onClick = {returnDash}
                            >
                                Return to Dashboard
                            </button>
                        </div>
                </div>
            </div>
        )
    )
}

export default Contract