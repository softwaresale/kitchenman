import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/state';
import { RemoveRecipe } from 'src/app/state/recipe/recipe.actions';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.sass']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

  onDelete() {
    this.store.dispatch(new RemoveRecipe(this.recipe));
  }

  viewImage(id: string): void {
  }
}
