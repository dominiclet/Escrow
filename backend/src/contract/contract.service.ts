import { HttpException, HttpStatus, Injectable, UseFilters } from "@nestjs/common";
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
        const payer = await this.accountService.findOne(fromAddress.toLowerCase());
        const payee = await this.accountService.findOne(toAddress.toLowerCase());
        const contract = this.contractRepository.create({
            payer: payer,
            payee: payee,
            name: contractName,
            address: contractAddress.toLowerCase(),
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

    @UseFilters(EntityNotFoundExceptionFilter)
    async offer(callerAddress: string, contractAddress: string): Promise<Contract> {
        const contract = await this.contractRepository.findOne({
            relations: ['payee', 'payer'],
            where: {
                address: contractAddress,
            }
        });
        if (contract.state != ContractState.A_OFFER) {
            throw new HttpException('Contract currently not in awaiting offer state', HttpStatus.METHOD_NOT_ALLOWED);
        }
        if (contract.payer.walletId != callerAddress) {
            throw new HttpException('Method only allowed to be called by payee', HttpStatus.UNAUTHORIZED);
        }
        contract.state = ContractState.A_ACCEPTANCE;
        const savedContract = await this.contractRepository.save(contract);
        return savedContract;
    }

    @UseFilters(EntityNotFoundExceptionFilter)
    async withdrawOffer(callerAddress: string, contractAddress: string): Promise<Contract> {
        const contract = await this.contractRepository.findOne({
            relations: ['payee', 'payer'],
            where: {
                address: contractAddress,
            }
        });
        if (contract.state != ContractState.A_ACCEPTANCE) {
            throw new HttpException('Contract currently not in awaiting acceptance state', HttpStatus.METHOD_NOT_ALLOWED);
        }
        if (contract.payer.walletId != callerAddress) {
            throw new HttpException('Method only allowed to be called by payee', HttpStatus.UNAUTHORIZED);
        }
        contract.state = ContractState.A_OFFER;
        const savedContract = await this.contractRepository.save(contract);
        return savedContract;
    }

    @UseFilters(EntityNotFoundExceptionFilter)
    async accept(callerAddress: string, contractAddress: string): Promise<Contract> {
        const contract = await this.contractRepository.findOne({
            relations: ['payee', 'payer'],
            where: {
                address: contractAddress,
            }
        });
        if (contract.state != ContractState.A_ACCEPTANCE) {
            throw new HttpException('Contract currently not in awaiting acceptance state', HttpStatus.METHOD_NOT_ALLOWED);
        }
        if (contract.payee.walletId != callerAddress) {
            throw new HttpException('Method only allowed to be called by payer', HttpStatus.UNAUTHORIZED);
        }
        contract.state = ContractState.A_PERFORMANCE;
        const savedContract = await this.contractRepository.save(contract);
        return savedContract;
    }

    @UseFilters(EntityNotFoundExceptionFilter)
    async triggerDispute(callerAddress: string, contractAddress: string): Promise<Contract> {
        const contract = await this.contractRepository.findOne({
            relations: ['payee', 'payer'],
            where: {
                address: contractAddress,
            }
        });
        if (contract.state != ContractState.A_PERFORMANCE) {
            throw new HttpException('Contract currently not in awaiting performance state', HttpStatus.METHOD_NOT_ALLOWED);
        }
        if (contract.payee.walletId != callerAddress && contract.payer.walletId != callerAddress) {
            throw new HttpException('Method only allowed to be called by parties involved', HttpStatus.UNAUTHORIZED);
        }
        contract.state = ContractState.DISPUTE;
        const savedContract = await this.contractRepository.save(contract);
        return savedContract;
    }

    @UseFilters(EntityNotFoundExceptionFilter)
    async completeContract(callerAddress: string, contractAddress: string): Promise<Contract> {
        const contract = await this.contractRepository.findOne({
            relations: ['payee', 'payer'],
            where: {
                address: contractAddress,
            }
        });
        if (contract.state != ContractState.A_PERFORMANCE) {
            throw new HttpException('Contract currently not in awaiting performance state', HttpStatus.METHOD_NOT_ALLOWED);
        }
        if (contract.payer.walletId != callerAddress) {
            throw new HttpException('Method only allowed to be called by payer', HttpStatus.UNAUTHORIZED);
        }
        contract.state = ContractState.COMPLETE;
        const savedContract = await this.contractRepository.save(contract);
        return savedContract;
    }
}