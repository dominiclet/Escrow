import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Contract } from "src/contract/contract.entity";

@Entity()
export class Account {
    @PrimaryColumn()
    walletId: string;

    @Column()
    username: string;

    @OneToMany(type => Contract, contract => contract.payer)
    payerContracts: Contract[]

    @OneToMany(type => Contract, contract => contract.payee)
    payeeContracts: Contract[]
}