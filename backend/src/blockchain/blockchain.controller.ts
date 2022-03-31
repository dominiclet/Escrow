import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";
import { CreateBlockchainContractDto } from "./dto/create-blockchain-contract.dto";
import { OfferBlockchainDto } from "./dto/offer-blockchain.dto";
import { GenericCallDto } from "./dto/generic-call.dto";
import { Transaction } from "./interfaces/transaction.interface";
import { ContractParties } from "./interfaces/contract-parties.interface";
import { ExtendExpiryDto } from "./dto/extend-expiry.dto";
import { isContractAddressInBloom } from "web3-utils";
import { ProposedExpiries } from "./interfaces/proposed-expiries.interface";

@Controller('blockchain')
export class BlockchainController {
    constructor(private blockchainService: BlockchainService) {}

    @Post('create')
    create(@Body() createContractDto: CreateBlockchainContractDto): Promise<Transaction> {
        const { deployAddress, fromAddress, toAddress, arbitrator } = createContractDto;
        return this.blockchainService.createContract(deployAddress, fromAddress, toAddress, arbitrator);
    }

    // State-altering methods

    @Post('offer')
    offer(@Body() offerDto: OfferBlockchainDto): Transaction {
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

    @Post('extendExpiry')
    extendExpiry(@Body() extendExpiryDto: ExtendExpiryDto) {
        const { callerAddress, contractAddress, proposedExpiry } = extendExpiryDto;
        return this.blockchainService.extendExpiry(callerAddress, contractAddress, proposedExpiry);
    }

    // Read-only methods

    @Get(':contractAddress/parties')
    async getPayer(@Param('contractAddress') contractAddress: string): Promise<ContractParties> {
        const payer = await this.blockchainService.getPayerAddress(contractAddress);
        const payee = await this.blockchainService.getPayeeAddress(contractAddress);
        return {
            payer,
            payee
        };
    }

    @Get(':contractAddress/expiryTime')
    getExpiryTime(@Param('contractAddress') contractAddress: string): Promise<number> {
        return this.blockchainService.getContractExpiry(contractAddress);
    }

    @Get(':contractAddress/proposedExpiries')
    async getProposedExpiries(@Param('contractAddress') contractAddress: string): Promise<ProposedExpiries> {
        const payerProposed = await this.blockchainService.getPayerProposedExpiry(contractAddress);
        const payeeProposed = await this.blockchainService.getPayeeProposedExpiry(contractAddress);
        return {
            payerProposed,
            payeeProposed,
        };
    }
}