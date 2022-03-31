import { Injectable } from "@nestjs/common";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Transaction } from "./interfaces/transaction.interface";
import smartContractJson from "./smart-contract/Escrow.json";

@Injectable()
export class BlockchainService {
    private web3: Web3;
    private gasPrice: string;

    constructor() {
        this.web3 = new Web3(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);
        this.web3.eth.getGasPrice().then((averageGasPrice) => {
            console.log("Average gas price: " + averageGasPrice);
            this.gasPrice = averageGasPrice;
        });
    }

    async createContract(deployingAddress: string, escrowFrom: string, escrowTo: string, arbitrator: string): Promise<Transaction> {
        var contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[]);
        var deploy = contract.deploy({
            data: smartContractJson.bytecode,
            arguments: [escrowFrom, escrowTo, arbitrator],
        });
        const deployData = deploy.encodeABI();
        const tx = {
            data: deployData,
            from: deployingAddress,
        }
        return tx;
    }

    offer(callerAddress: string, contractAddress: string, expiryTime: number, value: number): Transaction {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const data = contract.methods.offer(expiryTime).encodeABI();
        const tx = {
            data: data,
            from: callerAddress,
            to: contractAddress,
            value: value,
        }
        return tx;
    }

    async withdrawOffer(callerAddress: string, contractAddress: string): Promise<Transaction> {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const data = contract.methods.withdrawOffer().encodeABI();
        const tx = {
            data: data,
            from: callerAddress,
            to: contractAddress,
        }
        return tx;
    }

    accept(callerAddress: string, contractAddress: string): Transaction {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const data = contract.methods.accept().encodeABI();
        const tx = {
            data: data,
            from: callerAddress,
            to: contractAddress,
        }
        return tx;
    }

    triggerDispute(callerAddress: string, contractAddress: string): Transaction {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const data = contract.methods.triggerDispute().encodeABI();
        const tx = {
            data: data,
            from: callerAddress,
            to: contractAddress,
        }
        return tx;
    }

    extendExpiry(callerAddress: string, contractAddress: string, proposedExpiry: number): Transaction {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const data = contract.methods.proposeExtendExpiry(proposedExpiry).encodeABI();
        const tx = {
            data: data,
            from: callerAddress,
            to: contractAddress,
        }
        return tx;
    }

    confirmPerformance(callerAddress: string, contractAddress: string): Transaction {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const data = contract.methods.confirmPerformance().encodeABI();
        const tx = {
            data: data,
            from: callerAddress,
            to: contractAddress,
        }
        return tx;
    }

    expiredWithdraw(callerAddress: string, contractAddress: string): Transaction {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const data = contract.methods.expiredWithdraw().encodeABI();
        const tx = {
            data: data,
            from: callerAddress,
            to: contractAddress,
        }
        return tx;
    }

    async getPayerAddress(contractAddress: string): Promise<string> {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const payer = await contract.methods.payer().call();
        return payer;
    }

    async getPayeeAddress(contractAddress: string): Promise<string> {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const payee = await contract.methods.payee().call();
        return payee;
    }

    async getContractExpiry(contractAddress: string) {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const expiryTime = await contract.methods.expiryTime().call();
        return expiryTime;
    }

    async getPayerProposedExpiry(contractAddress: string) {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const proposedExpiry = await contract.methods.payerProposedExtendedExpiry().call();
        return proposedExpiry;
    }

    async getPayeeProposedExpiry(contractAddress: string) {
        const contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[], contractAddress);
        const proposedExpiry = await contract.methods.payeeProposedExtendedExpiry().call();
        return proposedExpiry;
    }
}