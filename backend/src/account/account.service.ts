import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./account.entity";
import { CreateAccount } from "./interfaces/account.interface";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {}

    async create(account: CreateAccount): Promise<Account> {
        // Consider checking if walletID is valid here
        const save = {
            walletId: account.walletId.toLowerCase(),
            username: account.username,
        }
        const newAccount = this.accountRepository.create(save);
        const savedAcc = await this.accountRepository.save(newAccount);
        return savedAcc;
    }

    async fetchAll(): Promise<Account[]> {
        const account = await this.accountRepository.find({});
        return account;
    }

    findOne(walletId: string): Promise<Account> {
        const account = this.accountRepository.findOneOrFail({
            walletId
        })
        return account;
    }

}