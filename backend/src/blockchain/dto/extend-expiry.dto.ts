import { IsNotEmpty, IsNumber } from "class-validator";

export class ExtendExpiryDto {
    @IsNotEmpty()
    callerAddress: string;

    @IsNotEmpty()
    contractAddress: string;

    @IsNumber()
    proposedExpiry: number;
}