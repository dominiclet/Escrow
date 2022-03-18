import { Injectable } from "@nestjs/common";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
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

    async createContract(deployingAddress: string, escrowFrom: string, escrowTo: string) {
        var contract = new this.web3.eth.Contract(smartContractJson.abi as AbiItem[]);
        var deploy = contract.deploy({
            data: smartContractJson.bytecode,
            arguments: [escrowFrom, escrowTo],
        });
        const estimatedGas = await deploy.estimateGas();
        deploy.send({
            from: deployingAddress,
            gas: estimatedGas,
            gasPrice: this.gasPrice,
        });
    }
}