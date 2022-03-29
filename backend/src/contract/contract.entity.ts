import { Account } from "src/account/account.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

export enum ContractState {
    A_OFFER,
    A_ACCEPTANCE,
    A_PERFORMANCE,
    COMPLETE
}

@Entity()
export class Contract {
    @PrimaryColumn()
    address: string;

    @Column()
    name: string;

    @ManyToOne(type => Account, account => account.payerContracts)
    payer: Account;

    @ManyToOne(type => Account, account => account.payeeContracts)
    payee: Account;

    @Column()
    state: ContractState;
}