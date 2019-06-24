import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../recipe';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.sass']
})
export class IngredientEditComponent implements OnInit {

  @Input() ingredients: Ingredient[];
  @Output() updatedIngredients: EventEmitter<Ingredient[]>;
  newIngredientForm: FormGroup;

  constructor() {
    this.updatedIngredients = new EventEmitter<Ingredient[]>();
  }

  ngOnInit() {
    this.newIngredientForm = new FormGroup({
      name: new FormControl(),
      qty: new FormControl(),
      unit: new FormControl(),
      description: new FormControl(),
    });
  }

  onSubmit(): void {
    const newIngredient: Ingredient = this.newIngredientForm.value;
    this.ingredients.push(newIngredient);
    this.updatedIngredients.emit(this.ingredients);
  }
}
