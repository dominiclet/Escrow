import { Account } from "src/account/account.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Contract {
    @PrimaryColumn()
    address: string;

    @ManyToOne(type => Account, account => account.walletId)
    payerId: string;

    @ManyToOne(type => Account, account => account.walletId)
    payeeId: string;

    @Column()
    state: string;
    // Consider changing to enum
}