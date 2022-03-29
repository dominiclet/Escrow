import { IsNotEmpty } from 'class-validator';

export class CreateContractDto {
    @IsNotEmpty()
    contractAddress: string;

    @IsNotEmpty()
    contractName: string;

    @IsNotEmpty()
    fromAddress: string;

    @IsNotEmpty()
    toAddress: string;
}