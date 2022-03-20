import { Injectable } from "@nestjs/common";
import { BlockchainService } from "src/blockchain/blockchain.service";
import { Transaction } from "src/blockchain/interfaces/transaction.interface";

@Injectable()
export class ContractService {
    constructor(private blockchainService: BlockchainService) {}

    create(deployAddress: string, escrowFrom: string, escrowTo: string): Promise<Transaction> {
        return this.blockchainService.createContract(deployAddress, escrowFrom, escrowTo);
    }
}