import { IsNotEmpty } from "class-validator";

export class GenericCallDto {
    @IsNotEmpty()
    callerAddress: string;

    @IsNotEmpty()
    contractAddress: string;
}