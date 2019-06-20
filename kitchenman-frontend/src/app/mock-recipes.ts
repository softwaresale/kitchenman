
import { Recipe, Ingredient } from './recipe';

export const RECIPES: Recipe[] = [
    {
        id: 0,
        name: 'Eggs and Bacon',
        author: 'Charlie Sale',
        ingredients: [
            {
                name: 'Bacon',
                unit: 'Slice',
                qty: 3,
            },
            {
                name: 'Eggs',
                unit: 'egg',
                qty: 2,
            }
        ],
        directions: [
            'Fry bacon in frying pan. Once done, remove bacon',
            'Cook eggs in same pan',
            'Serve together',
        ],
        imgUri: 'assets/bacon_and_eggs.jpeg',
    },
    {
        id: 1,
        name: 'Cereal',
        author: 'John Smith',
        ingredients: [
            {
                name: 'Cereal',
                unit: 'Box',
                qty: 1,
                description: 'Any type of cereal you want'
            },
            {
                name: 'Milk',
                unit: 'cup',
                qty: 1,
            }
        ],
        directions: [
            'Put cereal into a bowl',
            'Pour milk over it',
            'Serve',
        ],
        imgUri: 'assets/cereal.jpg',
    },
];
