import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Contract } from "./contract.entity";
import { ContractService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";

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
        return this.contractService.getPayeeContracts(walletId);
    }

    @Get('payer/:walletId')
    getPayerContracts(@Param('walletId') walletId: string): Promise<Contract[]> {
        return this.contractService.getPayerContracts(walletId);
    }
}