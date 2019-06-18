
export interface Ingredient {
    name: string;
    qty: number;
    unit: string;
    description?: string;
}

export interface Recipe {
    name: string;
    author: string;
    description?: string;
    imgUri?: string;
    ingredients?: Ingredient[]; // TODO make this required
    directions?: string[]; // TODO make this required
}
