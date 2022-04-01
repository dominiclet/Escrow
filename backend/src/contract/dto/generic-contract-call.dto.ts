import { IsNotEmpty } from "class-validator";

export class GenericContractCallDto {
    @IsNotEmpty()
    fromAddress: string;

    @IsNotEmpty()
    contractAddress: string;
}