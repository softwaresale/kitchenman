import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  RecipeActionTypes, RecipeActions, RecipeFailure, RecipeSuccess,
  RecipeLoadSuccess, EditRecipeSuccess, LoadRecipes
} from './recipe.actions';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Injectable()
export class RecipeEffects {

  @Effect()
  loadRecipes$ = this.actions$.pipe(
    ofType(RecipeActionTypes.LoadRecipes),
    switchMap(action => this.recipeService.getAll().pipe(
      map(recipes => {
        if (recipes) {
          return new RecipeLoadSuccess(recipes);
        } else {
          return new RecipeFailure('Service returned null');
        }
      }),
      catchError(error => {
        console.error('failed to dispatch load recipes');
        return of(new RecipeFailure(error));
      })
    )),
    catchError(error => of(new RecipeFailure(error))),
  );

  @Effect()
  editRecipe$ = this.actions$.pipe(
    ofType(RecipeActionTypes.EditRecipe),
    switchMap(action => this.recipeService.editById(action.payload.id, action.payload).pipe(
      map(status => {
        if (status) {
          return new EditRecipeSuccess();
        } else {
          return new RecipeFailure('Recipe could not be modified');
        }
      })
    )),
    catchError(error => of(new RecipeFailure(error)))
  );

  @Effect()
  editRecipeSuccess$ = this.actions$.pipe(
    ofType(RecipeActionTypes.EditRecipeSuccess),
    map(action => new LoadRecipes()),
    catchError(err => of(new RecipeFailure('Could not map edit recipe success'))),
  );

  constructor(
    private actions$: Actions<RecipeActions>,
    private recipeService: RecipeService,
  ) {}

}
