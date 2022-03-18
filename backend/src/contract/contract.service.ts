import { Injectable } from "@nestjs/common";
import { BlockchainService } from "src/blockchain/blockchain.service";

@Injectable()
export class ContractService {
    constructor(private blockchainService: BlockchainService) {}

    create(deployAddress: string, escrowFrom: string, escrowTo: string) {
        this.blockchainService.createContract(deployAddress, escrowFrom, escrowTo);
    }
}