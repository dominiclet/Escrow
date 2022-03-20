import { Body, Controller, Post } from "@nestjs/common";
import { Transaction } from "src/blockchain/interfaces/transaction.interface";
import { ContractService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";

@Controller('contract')
export class ContractController {
    constructor(private contractService: ContractService) {}

    @Post('create')
    create(@Body() createContractDto: CreateContractDto): Promise<Transaction> {
        const { deployAddress, fromAddress, toAddress } = createContractDto;
        return this.contractService.create(deployAddress, fromAddress, toAddress);
    }
}