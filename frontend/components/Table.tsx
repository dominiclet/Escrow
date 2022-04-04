import { Account, Contract, ContractState } from "../interfaces/DashboardDetails";
import {useRouter} from 'next/router';

interface Props {
    role: string;
    contractDetails: Array<Contract>;
    user: Account;
}

const stateColourGreen = (state: ContractState): boolean => {
    return state === ContractState.COMPLETE;
}

const counterParty = (user: Account, contract: Contract): string => {
    return user === contract.payee ? contract.payer.username : contract.payee.username;
}

const contractStateDisplay = (state: ContractState): string => {
    var arr = ["Awaiting Offer", "Awaiting Acceptance", "Awaiting Performance", "Complete"];
    return arr[state];
}

const Table = (props: Props) => {

    // view button function

    // filter contracts depending on whether table is to show user as payer or payee
    /*
    const filterTable = () => {
        if (props.role === "Service Provider") {
            return props.contractDetails.filter(contract => contract.payee === props.user)
        }
        else {
            return props.contractDetails.filter(contract => contract.payer === props.user)
        }
    }
    */

    return (
        <div>
            <section className="p-6">
                <p className="font-bold text-lg">Contracts as {props.role}</p>
            </section>
            <section className="container mx-auto px-6 font-mono">
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-[#BBB] uppercase border-b border-gray-600">
                                <th className="px-4 py-3">Name</th>
                                {props.role === "Purchaser" ?
                                    <th className="px-4 py-3">Payee</th>
                                    :
                                    <th className="px-4 py-3">Payer</th>
                                }
                                <th className="px-4 py-3">Stage</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {props.contractDetails.map(contract => (
                                <tr className="text-gray-700" key={contract.address}>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <p className="font-semibold text-black font-semibold">{contract.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-ms">{counterParty(props.user, contract)}</td>
                                    
                                    <td className="px-4 py-3 text-xs">
                                        {stateColourGreen(contract.state) ? 
                                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> 
                                                {contractStateDisplay(contract.state)}
                                            </span>
                                            :
                                            <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                                                {contractStateDisplay(contract.state)}
                                            </span>
                                        }
                                    </td>                                
                                    <td className="px-4 py-3 text-sm">
                                        <button className="self-center text-white bg-gray hover:bg-black 
                                            rounded-full px-4 py-2 text-sm">
                                            View
                                        </button>
                                    </td>
                                </tr>                            
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Table