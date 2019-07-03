import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/recipe';
import { FormGroup, FormBuilder } from '@angular/forms';
import IngredientDataSource from './ingredients.data-source';
import { of } from 'rxjs';

@Component({
  selector: 'app-ingredients-edit',
  templateUrl: './ingredients-edit.component.html',
  styleUrls: ['./ingredients-edit.component.sass']
})
export class IngredientsEditComponent implements OnInit {

  @Input() ingredients: Ingredient[];
  ingredientsData: IngredientDataSource;
  columnsToDisplay = ['name', 'qty', 'unit', 'description'];

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
      this.ingredientsData = new IngredientDataSource(of(this.ingredients));
    }
  }

  onAddIngredient(): void {
    this.ingredients.push(this.newIngredientForm.value);
  }

}
