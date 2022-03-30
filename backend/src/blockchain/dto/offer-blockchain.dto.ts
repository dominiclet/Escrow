import { IsNotEmpty, IsNumber } from "class-validator";

export class OfferDto {
    @IsNotEmpty()
    callerAddress: string;

    @IsNotEmpty()
    contractAddress: string;

    @IsNumber()
    expiryTime: number;

    @IsNotEmpty()
    value: number;
}