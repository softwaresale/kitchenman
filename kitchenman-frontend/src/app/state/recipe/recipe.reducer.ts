
import { RecipeActions, RecipeActionTypes } from './recipe.actions';
import { Recipe } from 'src/app/interfaces/recipe';

export interface State {
  recipes: {[ids: string]: Recipe};
  isError: boolean;
  errorInfo: any;
}

export const initialState: State = {
  recipes: {},
  isError: false,
  errorInfo: null,
};

export function reducer(state = initialState, action: RecipeActions): State {
  switch (action.type) {

    case RecipeActionTypes.LoadRecipes:
      return state;

    case RecipeActionTypes.RecipeLoadSuccess:
      const recipes = state.recipes;
      action.payload.forEach(recipe => recipes[recipe.id] = recipe);
      return { ...state, recipes, isError: false, errorInfo: null };

    case RecipeActionTypes.RecipeFailure:
      return { ...state, recipes: null, isError: true, errorInfo: action.payload };

    case RecipeActionTypes.RecipeSuccess:
      return { ...state, isError: false, errorInfo: null };

    default:
      return state;
  }
}
