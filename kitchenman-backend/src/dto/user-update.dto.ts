
import { Recipe } from '../recipe/recipe.entity';
import { IsEmail } from 'class-validator';

export class UpdateUserDto {
    readonly username?: string;
    @IsEmail()
    readonly email?: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly password?: string;
    readonly recipes?: Recipe[];
}
