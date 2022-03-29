import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountModule } from "src/account/account.module";
import { ContractController } from "./contract.controller";
import { Contract } from "./contract.entity";
import { ContractService } from "./contract.service";

@Module({
    imports: [TypeOrmModule.forFeature([Contract]), AccountModule],
    providers: [ContractService],
    controllers: [ContractController],
})
export class ContractModule {}