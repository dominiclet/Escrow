import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
    @IsNotEmpty()
    walletId: string;

    @IsNotEmpty()
    username: string;
}