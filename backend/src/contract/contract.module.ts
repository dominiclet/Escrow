import { Module } from "@nestjs/common";
import { BlockchainService } from "src/blockchain/blockchain.service";
import { ContractController } from "./contract.controller";
import { ContractService } from "./contract.service";

@Module({
    imports: [],
    providers: [ContractService, BlockchainService],
    controllers: [ContractController],
})
export class ContractModule {}