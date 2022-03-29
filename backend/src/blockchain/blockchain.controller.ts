import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";
import { CreateBlockchainContractDto } from "./dto/create-blockchain-contract.dto";
import { OfferDto } from "./dto/offer-blockchain.dto";
import { Transaction } from "./interfaces/transaction.interface";

@Controller('blockchain')
export class BlockchainController {
    constructor(private blockchainService: BlockchainService) {}

    @Post('create')
    create(@Body() createContractDto: CreateBlockchainContractDto): Promise<Transaction> {
        const { deployAddress, fromAddress, toAddress, arbitrator } = createContractDto;
        return this.blockchainService.createContract(deployAddress, fromAddress, toAddress, arbitrator);
    }

    @Post('offer')
    offer(@Body() offerDto: OfferDto): Transaction {
        const { callerAddress, contractAddress, expiryTime } = offerDto;
        return this.blockchainService.offer(callerAddress, contractAddress, expiryTime);
    }

    @Get(':contractAddress/payer')
    getPayer(@Param('contractAddress') contractAddress: string): Promise<string> {
        return this.blockchainService.getPayerAddress(contractAddress);
    }
}