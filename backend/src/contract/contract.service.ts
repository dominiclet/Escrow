import { Injectable, UseFilters } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountService } from "src/account/account.service";
import { EntityNotFoundExceptionFilter } from "src/filters/entity-not-found-exception.filter";
import { Repository } from "typeorm";
import { Contract, ContractState } from "./contract.entity";
import { CreateContract } from "./interfaces/contract.interface";

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private contractRepository: Repository<Contract>,
        private accountService: AccountService
    ) {}

    @UseFilters(EntityNotFoundExceptionFilter)
    async create(createContract: CreateContract): Promise<Contract> {
        const { contractAddress, contractName, fromAddress, toAddress } = createContract;
        const payer = await this.accountService.findOne(fromAddress);
        const payee = await this.accountService.findOne(toAddress);
        const contract = this.contractRepository.create({
            payer: payer,
            payee: payee,
            name: contractName,
            address: contractAddress,
            state: ContractState.A_OFFER,
        });
        const newContract = await this.contractRepository.save(contract);
        return newContract;
    }

    async getPayeeContracts(walletId: string): Promise<Contract[]> {
        const contracts = await this.contractRepository.find({
            relations: ['payee', 'payer'],
            where: {
                payee: {
                    walletId: walletId,
                }
            }
        });

        return contracts;
    }

    async getPayerContracts(walletId: string): Promise<Contract[]> {
        const contracts = await this.contractRepository.find({
            relations: ['payee', 'payer'],
            where: {
                payer: {
                    walletId: walletId,
                }
            }
        });
        return contracts;
    }
}