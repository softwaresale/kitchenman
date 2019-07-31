import { Component, OnInit, OnChanges } from '@angular/core';
import { map, tap, filter } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Recipe } from '../../interfaces/recipe';
import { Observable, combineLatest } from 'rxjs';
import { AppState, selectRecipes, selectRecipeError } from 'src/app/state/state';
import { Store, select } from '@ngrx/store';
import { LoadRecipes } from 'src/app/state/recipe/recipe.actions';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-recipes-dash',
  templateUrl: './recipes-dash.component.html',
  styleUrls: ['./recipes-dash.component.css']
})
export class RecipesDashComponent implements OnInit {

  recipes$: Observable<Recipe[]>;
  isError$: Observable<boolean>;

  /** Based on the screen size, switch from standard to one column per row */
  cards$: Observable<{recipe: Recipe, cols: number, rows: number}[]>;

  constructor(
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadRecipes());
    this.isError$ = this.store.pipe(select(selectRecipeError)).pipe(
      tap(status => { if (status) { this.snackBar.open('Error loading recipes', 'Close', { duration: 3000 }); } })
    );
    this.recipes$ = this.store.pipe(
      select(selectRecipes),
      map(recipes => recipes.filter(value => value.id !== 'new')),
    );

    this.cards$ = combineLatest([this.recipes$, this.breakpointObserver.observe(Breakpoints.Handset)]).pipe(
      map(array => ({ recipes: array[0], matches: array[1].matches })),
      map(obj => {
        if (obj.matches) {
          return obj.recipes.map((recipe: Recipe) =>
            ({ recipe, cols: 1, rows: 1 })
          );
        } else {
          return obj.recipes.map((recipe: Recipe) =>
            ({ recipe, cols: 1, rows: 1 }) // * Handle large display differently someday
          );
        }
      })
    );
  }
}
