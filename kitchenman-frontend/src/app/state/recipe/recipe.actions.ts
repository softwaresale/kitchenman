import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/interfaces/recipe';

export enum RecipeActionTypes {
  LoadRecipes = '[Recipe] Load Recipes',
  EditRecipe = '[Recipe] Edit recipe',
  NewRecipe = '[Recipe] New recipe',
  RemoveRecipe = '[Recipe] Remove recipe',
  RecipeSuccess = '[Recipe] Recipe action success',
  RecipeFailure = '[Recipe] Recipe action failed',
  RecipeLoadSuccess = '[Recipe] Recipe load success',
}

export class LoadRecipes implements Action {
  readonly type = RecipeActionTypes.LoadRecipes;
}

export class EditRecipe implements Action {
  readonly type = RecipeActionTypes.EditRecipe;

  constructor(public payload: Recipe) { }
}

export class NewRecipe implements Action {
  readonly type = RecipeActionTypes.NewRecipe;

  constructor(public payload: Recipe) { }
}

export class RemoveRecipe implements Action {
  readonly type = RecipeActionTypes.RemoveRecipe;

  constructor(public payload: Recipe) { }
}

export class RecipeSuccess implements Action {
  readonly type = RecipeActionTypes.RecipeSuccess;

  constructor(public payload: any) { }
}

export class RecipeFailure implements Action {
  readonly type = RecipeActionTypes.RecipeFailure;

  constructor(public payload: any) { }
}

export class RecipeLoadSuccess implements Action {
  readonly type = RecipeActionTypes.RecipeLoadSuccess;

  constructor(public payload: Recipe[]) { }
}

export type RecipeActions
  = LoadRecipes
  | EditRecipe
  | NewRecipe
  | RemoveRecipe
  | RecipeSuccess
  | RecipeFailure
  | RecipeLoadSuccess;
