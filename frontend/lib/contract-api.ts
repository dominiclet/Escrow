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

export async function offerContractApi(fromAddress: string, contractAddress: string): Promise<boolean> {
    try {
        const contract = axios.post(`${apiRoot}/contract/offer`, {
            fromAddress, 
            contractAddress,
        });
        console.log(contract);
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}

export async function withdrawOfferApi(fromAddress: string, contractAddress: string): Promise<boolean> {
    try {
        axios.post(`${apiRoot}/contract/withdrawOffer`, {
            fromAddress, 
            contractAddress,
        });
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}

export async function acceptOfferApi(fromAddress: string, contractAddress: string): Promise<boolean> {
    try {
        axios.post(`${apiRoot}/contract/accept`, {
            fromAddress, 
            contractAddress,
        });
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}

export async function triggerDisputeApi(fromAddress: string, contractAddress: string): Promise<boolean> {
    try {
        axios.post(`${apiRoot}/contract/triggerDispute`, {
            fromAddress, 
            contractAddress,
        });
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}

export async function completeContractApi(fromAddress: string, contractAddress: string): Promise<boolean> {
    try {
        axios.post(`${apiRoot}/contract/completeContract`, {
            fromAddress, 
            contractAddress,
        });
    } catch (e) {
        console.log(e);
        return false;
    } return true;
}