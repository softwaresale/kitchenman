import { Ingredient } from 'src/interfaces/ingredient.interface';
import { User } from 'src/user/user.entity';

export interface RecipeCreateDto {
    name: string;
    description?: string;
    author?: User;
    directions: string[];
    ingredients: Ingredient[];
}

export interface RecipeUpdateDto {
    name?: string;
    description?: string;
    directions?: string[];
    ingredients?: Ingredient[];
}
