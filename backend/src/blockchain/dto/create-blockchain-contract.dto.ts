import { IsNotEmpty } from "class-validator";

export class CreateBlockchainContractDto {
    @IsNotEmpty()
    deployAddress: string;

    @IsNotEmpty()
    fromAddress: string;

    @IsNotEmpty()
    toAddress: string;

    @IsNotEmpty()
    arbitrator: string;
}