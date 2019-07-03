import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/recipe';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ingredients-edit',
  templateUrl: './ingredients-edit.component.html',
  styleUrls: ['./ingredients-edit.component.sass']
})
export class IngredientsEditComponent implements OnInit {

  @Input() ingredients: Ingredient[];
  columnsToDisplay = ['name', 'qty', 'unit', 'description'];
  ingredientData: MatTableDataSource<Ingredient>;
  newIngredientForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newIngredientForm = this.fb.group({
      name: [''],
      qty: [0],
      unit: [''],
      description: [''],
    });

    if (this.ingredients) {
      this.ingredientData = new MatTableDataSource<Ingredient>(this.ingredients);
    } else {
      console.error('ingredients are empty');
    }
  }

  onAddIngredient(): void {
    // TODO add validation
    this.ingredients.push(this.newIngredientForm.value);
    this.ingredientData.data = this.ingredients;
    this.newIngredientForm.reset();
  }
}
