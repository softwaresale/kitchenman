import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecipeActionTypes, RecipeActions, RecipeFailure, RecipeSuccess, RecipeLoadSuccess } from './recipe.actions';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Injectable()
export class RecipeEffects {

  @Effect()
  loadRecipes$ = this.actions$.pipe(
    ofType(RecipeActionTypes.LoadRecipes),
    switchMap(action => this.recipeService.getAll().pipe(
      map(recipes => new RecipeLoadSuccess(recipes)),
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
      map(status => new RecipeSuccess('Successfully edited recipe'))
    )),
    catchError(error => of(new RecipeFailure(error)))
  );

  constructor(
    private actions$: Actions<RecipeActions>,
    private recipeService: RecipeService,
  ) {}

}
