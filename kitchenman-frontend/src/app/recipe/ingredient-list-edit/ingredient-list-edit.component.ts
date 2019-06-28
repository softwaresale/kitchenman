import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/recipe';

@Component({
  selector: 'app-ingredient-list-edit',
  templateUrl: './ingredient-list-edit.component.html',
  styleUrls: ['./ingredient-list-edit.component.sass']
})
export class IngredientListEditComponent implements OnInit {

  @Input() initialIngredients: Ingredient[];
  @Output() newIngredients: EventEmitter<Ingredient[]>;

  newList: FormGroup;

  get ingredients(): FormArray {
    return this.newList.get('ingredients') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.newIngredients = new EventEmitter<Ingredient[]>();

    // Create form
    this.newList = this.fb.group({
      ingredients: this.fb.array([]),
    });

    // Add control for each ingredient
    this.initialIngredients.forEach(ingredient => {
    });
  }

  ngOnInit() {
  }
}
