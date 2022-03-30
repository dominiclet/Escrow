import { IsNotEmpty, IsNumber } from "class-validator";

export class OfferBlockchainDto {
    @IsNotEmpty()
    callerAddress: string;

    @IsNotEmpty()
    contractAddress: string;

    @IsNumber()
    expiryTime: number;

    @IsNotEmpty()
    value: number;
}