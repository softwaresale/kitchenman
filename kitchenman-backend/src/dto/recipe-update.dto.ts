
import { Ingredient } from '../interfaces/ingredient.interface';

export class RecipeUpdateDto {
    name?: string;
    description?: string;
    directions?: string[];
    ingredients?: Ingredient[];
}
