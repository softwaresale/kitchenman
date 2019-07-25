import { User } from './user';

export interface Ingredient {
    name: string;
    qty: number;
    unit: string;
    description?: string;
}

export interface Recipe {
    id?: string;
    name: string;
    author: User;
    description?: string;
    imgUri?: string;
    ingredients?: Ingredient[]; // TODO make this required
    directions?: string[]; // TODO make this required
}
