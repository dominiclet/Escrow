import axios from "axios";
import { apiRoot } from "../config";

export async function createContractApi(contractAddress: string, fromAddress: string, toAddress: string, contractName: string): Promise<boolean> {
    try {
        const contract = axios.post(`${apiRoot}/contract/create`, {
            contractAddress, 
            contractName,
            fromAddress,
            toAddress,
        });
        console.log(contract);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}
