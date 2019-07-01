import { Ingredient } from '../interfaces/ingredient.interface';
import { User } from '../user/user.entity';
import { IsNotEmpty } from 'class-validator';

export class RecipeCreateDto {
    @IsNotEmpty()
    readonly name: string;
    readonly description?: string;
    author?: User;
    @IsNotEmpty()
    readonly directions: string[];
    @IsNotEmpty()
    readonly ingredients: Ingredient[];
}
