import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RECIPES } from '../mock-recipes';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.sass']
})
export class RecipeViewComponent implements OnInit {

  recipe$: Observable<Recipe>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recipe$ = this.activatedRoute.paramMap.pipe(
      switchMap((values: ParamMap, index: number) => of(RECIPES[values.get('id')]))
    );
  }

}
