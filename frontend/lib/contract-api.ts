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

export async function offerContractApi(callerAddress: string, contractAddress: string): Promise<boolean> {
    try {
        axios.post(`${apiRoot}/contract/offer`, {
            callerAddress, 
            contractAddress,
        });
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}

export async function withdrawOfferApi(callerAddress: string, contractAddress: string): Promise<boolean> {
    try {
        axios.post(`${apiRoot}/contract/withdrawOffer`, {
            callerAddress, 
            contractAddress,
        });
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}

export async function acceptOfferApi(callerAddress: string, contractAddress: string): Promise<boolean> {
    try {
        axios.post(`${apiRoot}/contract/accept`, {
            callerAddress, 
            contractAddress,
        });
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}

export async function triggerDisputeApi(callerAddress: string, contractAddress: string): Promise<boolean> {
    try {
        axios.post(`${apiRoot}/contract/triggerDispute`, {
            callerAddress, 
            contractAddress,
        });
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}

export async function completeContractApi(callerAddress: string, contractAddress: string): Promise<boolean> {
    try {
        axios.post(`${apiRoot}/contract/completeContract`, {
            callerAddress, 
            contractAddress,
        });
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}