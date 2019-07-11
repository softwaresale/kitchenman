import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe, Ingredient } from '../../recipe';
import { switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  recipeForm: FormGroup;
  newIngredientForm: FormGroup;
  ingredientsData: MatTableDataSource<FormGroup>;
  columnsToShow = ['name', 'qty', 'unit', 'description'];
  footerColumns = ['name', 'qty', 'unit', 'description', 'addBtn'];

  get ingredientsArrayControl(): FormArray { return this.recipeForm.get('ingredients') as FormArray; }

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // Get recipe from service
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap, index: number) => {
        const id: number = Number.parseInt(params.get('id'), 10);
        return this.recipeService.getById(id);
      })
    ).subscribe({
      next: (rec: Recipe) => this.recipe = rec,
      error: (err: any) => console.error(err),
    });

    // Create the form
    this.recipeForm = this.fb.group({
      name: [this.recipe.name, [Validators.required]],
      author: [this.recipe.author, [Validators.required]],
      ingredients: this.fb.array(
        this.recipe.ingredients.map<FormGroup>((value: Ingredient, idx: number, array: Ingredient[]) =>
          this.fb.group({
            name: [value.name],
            qty: [value.qty],
            unit: [value.unit],
            description: [value.description],
          })
        )
      ),
    });
    console.log('form created');
    console.log(this.recipeForm.value);

    // Create new ingredient form
    this.newIngredientForm = this.fb.group({
      name: [''],
      qty: [0],
      unit: [''],
      description: [''],
    });

    // Set the table data
    this.ingredientsData = new MatTableDataSource<FormGroup>(this.ingredientsArrayControl.controls as FormGroup[]);
  }

  onAddNewIngredient(): void {
    const ingredient: Ingredient = this.newIngredientForm.value;
    this.addNewIngredient(ingredient);
    this.newIngredientForm.reset();
  }

  private addNewIngredient(ingredient: Ingredient): void {
    this.ingredientsArrayControl.push(this.createIngredientControl(ingredient));
    this.ingredientsData.data = this.ingredientsArrayControl.controls as FormGroup[];
  }

  onSubmit(): void {
    console.log('submitted');
    console.log(this.recipeForm.value);
  }

  private createIngredientControl(ingredient: Ingredient): FormGroup {
    return this.fb.group({
      name: [ingredient.name],
      qty: [ingredient.qty],
      unit: [ingredient.unit],
      description: [ingredient.description],
    });
  }
}
