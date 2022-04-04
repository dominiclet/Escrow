import StepperComponent from "../../../components/StepperComponent";
import AccountInfo from "../../../components/AccountInfo";
import {useRouter} from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiRoot } from '../../../config';
import {Contract, Account, ContractState} from '../../../interfaces/DashboardDetails';
import { EthProvider } from '../../../interfaces/EthProvider';

const Contract =  () => {

    const router = useRouter();
    const [contractData, setContractData] = useState<Contract>();
    const [walletId, setWalletId] = useState<string>();

    useEffect(() => {
        const fetchUser = async() => {
            var accounts = await ((window as any).ethereum as EthProvider).request( {method: 'eth_requestAccounts'});
            if (accounts) {
                return accounts[0]
            }
        }
        fetchUser().then(res => {
            setWalletId(res);
        });
    }, [])

    useEffect(() => {
		if (router.isReady) {
			const { contractId } = router.query;
			axios.get(`${apiRoot}/contract/${contractId}`, {}).then(res => {
					if (res.status == 200) {
						setContractData(res.data);
					}
				}).catch(err => console.error(err));
		}
	}, [router.isReady]);

    return (
        ((contractData === undefined) ? 
            <div>
                <h1>Loading Contract Data...</h1>
            </div>
            :
            <div className="flex h-screen w-screen bg-background">
                <div className="flex flex-col w-screen m-10">
                    <div className="flex flex-row flow-root p-10">
                        <h1 className="float-left font-bold text-xl">Contract Overview</h1>
                        <AccountInfo walletId={walletId}/>
                    </div>
                    <div className="flex flex-col align-center m-10">
                        <table className="bg-[#FFF] w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">Contract Information</th>
                                    <th className="px-4 py-3"></th>
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
                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{contractData.name}</span>
                                    </td>
                                </tr>
                                <tr className="text-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <p className="font-semibold text-black font-semibold">Counter Party Name</p>
                                        </div>
                                    </td>                    
                                    <td className="px-4 py-3 text-xs">
                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-50 rounded-sm">{contractData.payer}</span>
                                    </td>
                                </tr>
                                <tr className="text-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <p className="font-semibold text-black font-semibold">Contract Address</p>
                                        </div>
                                    </td>                    
                                    <td className="px-4 py-3 text-xs">
                                        <span className="px-2 py-1 font-medium leading-tight text-green-700 bg-green-20 rounded-sm">{contractData.address}</span>
                                    </td>
                                </tr>
                                <tr className="text-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <p className="font-semibold text-black font-semibold">Completion Date</p>
                                        </div>
                                    </td>                    
                                    <td className="px-4 py-3 text-xs">
                                        <span className="px-2 py-1 font-medium leading-tight text-green-700 bg-green-20 rounded-sm">{contractData.expiry}</span>
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
                            <StepperComponent state={contractData.state}/>
                        </div>          
                        <div className="bg-[#FFF] w-full mt-10 text-gray-700">
                            <div className="px-4 py-3">
                                <p className="justify-center font-semibold text-black font-semibold">Actions to be Taken</p>
                            </div>                    
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Contract