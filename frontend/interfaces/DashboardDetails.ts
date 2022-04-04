export interface Account {
    walletId: string;
    username: string;
}

export enum ContractState {
    A_OFFER,
    A_ACCEPTANCE,
    A_PERFORMANCE,
    DISPUTES,
    COMPLETE,
}

export interface Contract {
    payer:Account;
    payee:Account;
    name:string; 
    address:string; 
    state:ContractState;
    expiry:string;
}