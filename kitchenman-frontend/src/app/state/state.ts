import {
  ActionReducerMap,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { State as ProfileState, reducer as ProfileReducer } from './profile/profile.reducer';
import { State as RecipeState, reducer as RecipeReducer } from './recipe/recipe.reducer';
import { Recipe } from '../interfaces/recipe';

export interface AppState {
  profile: ProfileState;
  recipe: RecipeState;
}

export const reducers: ActionReducerMap<AppState> = {
  profile: ProfileReducer,
  recipe: RecipeReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

// Selectors
export const selectUser = (state: AppState) => state.profile.user;
export const selectLoggedIn = (state: AppState) => state.profile.loggedIn;
export const selectRecipes = (state: AppState) => {
  const recipeObj = state.recipe.recipes;
  return Object.values(recipeObj);
};
export const selectRecipeError = (state: AppState) => state.recipe.isError;
export const selectNewRecipe = (state: AppState) => state.recipe.newRecipe;

// Get a specific recipe
export const selectRecipeId = createSelector(
  (state: AppState) => state.recipe.recipes,
  (recipeObj: {[id: string]: Recipe}, prop: {id: string}) => recipeObj[prop.id]
);
