import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";
import { CreateBlockchainContractDto } from "./dto/create-blockchain-contract.dto";
import { OfferDto } from "./dto/offer-blockchain.dto";
import { GenericCallDto } from "./dto/generic-call.dto";
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
        const { callerAddress, contractAddress, expiryTime, value } = offerDto;
        return this.blockchainService.offer(callerAddress, contractAddress, expiryTime, value);
    }

    @Post('withdrawOffer')
    withdrawOffer(@Body() genericCallDto: GenericCallDto) {
        const { callerAddress, contractAddress } = genericCallDto;
        return this.blockchainService.withdrawOffer(callerAddress, contractAddress);
    }

    @Post('accept')
    accept(@Body() genericCallDto: GenericCallDto) {
        const { callerAddress, contractAddress } = genericCallDto;
        return this.blockchainService.accept(callerAddress, contractAddress);
    }

    @Post('triggerDispute')
    triggerDispute(@Body() genericCallDto: GenericCallDto) {
        const { callerAddress, contractAddress } = genericCallDto;
        return this.blockchainService.triggerDispute(callerAddress, contractAddress);
    }

    @Get(':contractAddress/payer')
    getPayer(@Param('contractAddress') contractAddress: string): Promise<string> {
        return this.blockchainService.getPayerAddress(contractAddress);
    }
}