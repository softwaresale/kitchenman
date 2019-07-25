import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe, Ingredient } from '../../interfaces/recipe';
import { switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectRecipeId } from 'src/app/state/state';
import { EditRecipe } from 'src/app/state/recipe/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  recipe$: Observable<Recipe>;
  recipeForm: FormGroup;
  newIngredientForm: FormGroup;
  newDirectionControl: FormControl;
  ingredientsData: MatTableDataSource<FormGroup>;
  columnsToShow = ['name', 'qty', 'unit', 'description'];
  footerColumns = ['name', 'qty', 'unit', 'description', 'addBtn'];
  private validatorRegex = '^(\d*\.)?\d+$';

  get ingredientsArrayControl(): FormArray { return this.recipeForm.get('ingredients') as FormArray; }
  get directionsControls(): FormControl[] {
    const directionArray = this.recipeForm.get('directions') as FormArray;
    return directionArray.controls as FormControl[];
  }
  get directionsArray(): FormArray { return this.recipeForm.get('directions') as FormArray; }

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // Get recipe from service
    this.recipe$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap, index: number) => {
        const id = params.get('id');
        return this.store.pipe(select(selectRecipeId, { id }));
      })
    );

    // Subscribe to the state
    this.recipe$.subscribe(recipe => this.recipe = recipe, err => console.error(err));

    // Create the form
    this.recipeForm = this.fb.group({
      name: [this.recipe.name, [Validators.required]],
      author: [this.recipe.author.username, [Validators.required]],
      description: [this.recipe.description],
      ingredients: this.fb.array(
        this.recipe.ingredients.map<FormGroup>((value: Ingredient, idx: number, array: Ingredient[]) =>
          this.createIngredientControl(value)
        )
      ),
      directions: this.fb.array(
        this.recipe.directions.map<FormControl>((value: string, idx: number, array: string[]) =>
          this.createDirectionControl(value)
        )
      ),
    });

    // Create new ingredient form
    this.newIngredientForm = this.createIngredientControl(null);
    this.newDirectionControl = this.createDirectionControl('');

    // Set the table data
    this.ingredientsData = new MatTableDataSource<FormGroup>(this.ingredientsArrayControl.controls as FormGroup[]);
  }

  onAddNewIngredient(): void {
    const ingredient: Ingredient = this.newIngredientForm.value;
    this.addNewIngredient(ingredient);
    this.newIngredientForm.reset();
  }

  onAddDirection(): void {
    const val = this.newDirectionControl.value;
    this.addNewDirection(val);
    this.newDirectionControl.reset();
  }

  private addNewIngredient(ingredient: Ingredient): void {
    this.ingredientsArrayControl.push(this.createIngredientControl(ingredient));
    this.ingredientsData.data = this.ingredientsArrayControl.controls as FormGroup[];
  }

  private addNewDirection(dir: string): void {
    this.directionsArray.push(this.createDirectionControl(dir));
  }

  onSubmit(): void {
    const formValue = this.recipeForm.value;
    const newRecipe: Recipe = { ...formValue, id: this.recipe.id, author: this.recipe.author };
    this.store.dispatch(new EditRecipe(newRecipe));
  }

  private createIngredientControl(ingredient: Ingredient | null): FormGroup {
    if (ingredient) {
      return this.fb.group({
        name: [ingredient.name, [Validators.required]],
        /*qty: [ingredient.qty, [Validators.pattern(this.validatorRegex)]],*/
        qty: [ingredient.qty],
        unit: [ingredient.unit],
        description: [ingredient.description],
      });
    } else {
      return this.fb.group({
        name: ['', [Validators.required]],
        /*qty: [0, [Validators.pattern(this.validatorRegex)]],*/
        qty: [0],
        unit: [''],
        description: [''],
      });
    }
  }

  private createDirectionControl(val: string): FormControl {
    return this.fb.control(val);
  }
}
