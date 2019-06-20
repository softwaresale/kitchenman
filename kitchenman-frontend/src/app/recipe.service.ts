import { Injectable } from '@angular/core';
import { RECIPES } from './mock-data';
import { Observable, of, from } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private mockRecipes = RECIPES;

  constructor() { }

  getAll(): Observable<Recipe[]> {
    return of(this.mockRecipes);
  }

  getById(id: number): Observable<Recipe> {
    return of(this.mockRecipes[id]);
  }

  editById(id: number, updated: Recipe): Observable<Recipe> {
    this.mockRecipes[id] = updated;
    return this.getById(id);
  }
}
