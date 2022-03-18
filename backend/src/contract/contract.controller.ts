import { Controller, Post } from "@nestjs/common";
import { ContractService } from "./contract.service";

@Controller('contract')
export class ContractController {
    constructor(private contractService: ContractService) {}

    @Post('create')
    create() {
        //this.contractService.create();
    }
}