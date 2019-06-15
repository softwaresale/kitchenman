
export interface Ingredient {
    name: string;
    qty: number;
    unit: string;
    description?: string;
}

export interface Recipe {
    name: string;
    author: string;
    imageUri: string;
    ingredients?: Ingredient[];
    directions?: string[];
}
