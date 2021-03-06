import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/account/account.entity";
import { Contract, ContractState } from "src/contract/contract.entity";
import { Repository } from "typeorm";

@Injectable()
export class SeederService implements OnApplicationBootstrap {
    constructor(@InjectRepository(Account) private accountRepository: Repository<Account>,
        @InjectRepository(Contract) private contractRepository: Repository<Contract>) {}

    onApplicationBootstrap() {
        return this.run();
    }

    async run(): Promise<any> {
        const shouldSeed = process.env.SHOULD_SEED_DATABASE;
        if (!shouldSeed) {
            return;
        }
        console.log("Starting seed...");
        const shouldDrop = process.env.SHOULD_DROP_DATABASE;
        if (shouldDrop) {
            await this.drop();
        }
        return await this.seed();
    }

    async seed(): Promise<any> {
        const accounts = [{
                walletId: "0x6ccB52CfA25c80D206658da74A9c1B19D1C33702".toLowerCase(),
                username: "Dominic"
            }, 
            {
                walletId: "0x919191919191919199191919919191919919119",
                username: "Richardt Alaindt",
            }
        ];
        const alaindt = this.accountRepository.create({
            walletId: "0x5Ef041d84EFD549eFD5410cc6b9d24Fb9819b9bE".toLowerCase(),
            username: "Alaint Richardt",
        });
        const djordje = this.accountRepository.create({
            walletId: "0x1293192389829389389839893849834892834923",
            username: "Djordje",
        });
        const john = this.accountRepository.create({
            walletId: "0x0fB0A65ca2c3f9B35d6803cFf13C01B7624439d7".toLowerCase(),
            username: "John"
        });

        const contracts = [
            {
                payer: alaindt,
                payee: djordje,
                name: "Sub-contract for fiver work", 
                address: "0x1293892878758378838",
                state: ContractState.A_OFFER,
            }, 
        ]

        console.log("Seeding Accounts...");
        const accountEntities = this.accountRepository.create(accounts);
        await this.accountRepository.insert(accountEntities);
        await this.accountRepository.save(alaindt);
        await this.accountRepository.save(djordje);
        await this.accountRepository.save(john);

        console.log("Seeding Contracts...");
        const contractEntities = this.contractRepository.create(contracts);
        await this.contractRepository.insert(contractEntities);

        return;
    }

    async drop(): Promise<any> {
        console.log("Clearing the Contract table...")
        await this.contractRepository.createQueryBuilder().delete().from(Contract).execute();
        console.log("Clearing the Account table...")
        return await this.accountRepository.createQueryBuilder().delete().from(Account).execute();
    }
}