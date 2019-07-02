import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe, Ingredient } from '../../recipe';
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
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // Get ingredient to edit
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap, index: number) => {
        const id: number = Number.parseInt(params.get('id'), 10);
        return this.recipeService.getById(id);
      })
    ).subscribe({
      next: (rec: Recipe) => {
        this.recipe = rec;
      },
      error: (err: any) => console.error(err),
    });

    // Setup the ingredient edit form
    this.recipeForm = this.fb.group({
      name: [this.recipe.name, [Validators.required]],
      author: [this.recipe.author, [Validators.required]],
      ingredient: [this.recipe.ingredients[0]],
    });
  }

  onSubmit(): void {
    this.recipeForm.updateValueAndValidity(); // try to reupdate
    console.log('Form submitted');
    console.log(this.recipeForm.value);
  }
}
