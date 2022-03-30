import { IsNotEmpty } from "class-validator";

export class GenericContractCallDto {
    @IsNotEmpty()
    callerAddress: string;

    @IsNotEmpty()
    contractAddress: string;
}