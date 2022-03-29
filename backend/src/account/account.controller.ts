import { Body, Controller, Get, Param, Post, UseFilters } from "@nestjs/common";
import { EntityNotFoundExceptionFilter } from "src/filters/entity-not-found-exception.filter";
import { Account } from "./account.entity";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create-account.dto";

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Get('all')
    async fetchAll(): Promise<Account[]> {
        const accounts = this.accountService.fetchAll();
        return accounts;
    }

    @Get(':walletId')
    @UseFilters(EntityNotFoundExceptionFilter)
    async findOne(@Param('walletId') walletId: string) {
        const account = await this.accountService.findOne(walletId);
        return account;
    }

    @Post('register')
    async create(@Body() createAccountDto: CreateAccountDto) {
        const savedAcc = await this.accountService.create(createAccountDto);
        return savedAcc;
    }
}