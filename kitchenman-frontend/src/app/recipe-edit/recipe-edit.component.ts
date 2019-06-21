import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap, index: number) => {
        const id: number = Number.parseInt(params.get('id'), 10);
        return this.recipeService.getById(id);
      })
    ).subscribe({
      next: (rec: Recipe) => this.recipe = rec,
      error: (err: any) => console.error(err),
    });

    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe.name),
      ingredients: new FormControl(this.recipe.ingredients),
      directions: new FormControl(this.recipe.directions),
    });
  }

}
