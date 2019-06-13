import { Recipe } from 'src/recipe/recipe.entity';

export interface CreateUserDto {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
}

export interface UpdateUserDto extends CreateUserDto {
    recipes?: Recipe[];
}
