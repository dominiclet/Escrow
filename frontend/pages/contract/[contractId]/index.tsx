import IndivContract from "../../../components/IndivContract";
import {useRouter} from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiRoot } from '../../../config';
import {Contract, Account, ContractState} from '../../../interfaces/DashboardDetails';
import { EthProvider } from '../../../interfaces/EthProvider';
import useWallet from "../../../hooks/useWallet";

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
        ((walletId === undefined) ?
            <div>Please connect Metamask</div>
            :
            ((contractData === undefined) ? 
                <div>
                    <h1>Loading Contract Data...</h1>
                </div>
                :
                <IndivContract walletId={walletId} contract={contractData}/>
            )
        )
    )
}

export default Contract