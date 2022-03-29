import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/account/account.entity";
import { Contract } from "src/contract/contract.entity";
import { SeederService } from "./account.seeder";

@Module({
    imports: [
        TypeOrmModule.forFeature([Account, Contract])
    ],
    providers: [SeederService]
})
export class SeederModule {}