import { Component, OnInit } from '@angular/core';
import { Recipe, Ingredient } from '../recipe';

@Component({
  selector: 'app-recipes-main',
  templateUrl: './recipes-main.component.html',
  styleUrls: ['./recipes-main.component.sass']
})
export class RecipesMainComponent implements OnInit {

  recipes: Recipe[];

  constructor() { }

  ngOnInit() {
    this.recipes = [
      {
        name: 'Pizza Flatbread',
        author: 'Charlie Sale',
        imageUri: 'assets/test_food_pizza.jpg'
      },
      {
        name: 'Delicous Doughnuts',
        author: 'John Smith',
        imageUri: 'assets/test_food_doughnuts.jpg',
      }
    ];
  }
}
