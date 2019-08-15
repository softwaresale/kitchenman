import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppState, selectRecipeId } from 'src/app/state/state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.sass']
})
export class RecipeViewComponent implements OnInit {

  recipe$: Observable<Recipe>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipe$ = this.activatedRoute.paramMap.pipe(
      switchMap((map: ParamMap) => {
        const id = map.get('id');
        return this.store.pipe(select(selectRecipeId, {id}));
      })
    );
  }

  onEdit(id: string): void {
    const url = `recipes/edit/${id}`;
    this.router.navigate([url]);
  }
}
