import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Contract } from "./contract.entity";
import { ContractService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";
import { GenericContractCallDto } from "./dto/generic-contract-call.dto";

@Controller('contract')
export class ContractController {
    constructor(private contractService: ContractService) {}
    
    @Post('create')
    create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
        const contract = this.contractService.create(createContractDto);
        return contract;
    }

    @Get('payee/:walletId')
    getPayeeContracts(@Param('walletId') walletId: string): Promise<Contract[]> {
        return this.contractService.getPayeeContracts(walletId.toLowerCase());
    }

    @Get('payer/:walletId')
    getPayerContracts(@Param('walletId') walletId: string): Promise<Contract[]> {
        return this.contractService.getPayerContracts(walletId.toLowerCase());
    }

    @Get(':contractId')
    getContract(@Param('contractId') contractId:string): Promise<Contract>{
        return this.contractService.getContract(contractId.toLowerCase());
    }

    @Post('offer')
    offer(@Body() offerDto: GenericContractCallDto): Promise<Contract> {
        const { fromAddress, contractAddress } = offerDto;
        return this.contractService.offer(fromAddress.toLowerCase(), contractAddress.toLowerCase());
    }
    
    @Post('withdrawOffer')
    withdrawOffer(@Body() offerDto: GenericContractCallDto): Promise<Contract> {
        const { fromAddress, contractAddress } = offerDto;
        return this.contractService.withdrawOffer(fromAddress.toLowerCase(), contractAddress.toLowerCase());
    }

    @Post('accept')
    accept(@Body() acceptDto: GenericContractCallDto): Promise<Contract> {
        const { fromAddress, contractAddress } = acceptDto;
        return this.contractService.accept(fromAddress.toLowerCase(), contractAddress.toLowerCase());
    }

    @Post('triggerDispute')
    triggerDispute(@Body() genericCallDto: GenericContractCallDto): Promise<Contract> {
        const { fromAddress, contractAddress } = genericCallDto;
        return this.contractService.triggerDispute(fromAddress.toLowerCase(), contractAddress.toLowerCase());
    }

    @Post('completeContract')
    completeContract(@Body() genericCallDto: GenericContractCallDto): Promise<Contract> {
        const { fromAddress, contractAddress } = genericCallDto;
        return this.contractService.completeContract(fromAddress.toLowerCase(), contractAddress.toLowerCase());
    }
}