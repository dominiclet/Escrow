import { Body, Controller, Post } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";
import { CreateBlockchainContractDto } from "./dto/create-blockchain-contract.dto";
import { Transaction } from "./interfaces/transaction.interface";

@Controller('blockchain')
export class BlockchainController {
    constructor(private blockchainService: BlockchainService) {}

    @Post('create')
    create(@Body() createContractDto: CreateBlockchainContractDto): Promise<Transaction> {
        const { deployAddress, fromAddress, toAddress, arbitrator } = createContractDto;
        return this.blockchainService.createContract(deployAddress, fromAddress, toAddress, arbitrator);
    }
}