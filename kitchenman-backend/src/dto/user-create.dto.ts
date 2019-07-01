
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    readonly firstName?: string;
    readonly lastName?: string;

    @IsNotEmpty()
    readonly password: string;
}
