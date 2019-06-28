import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Ingredient } from 'src/app/recipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingredient-edit-form',
  templateUrl: './ingredient-edit-form.component.html',
  styleUrls: ['./ingredient-edit-form.component.sass']
})
export class IngredientEditFormComponent implements OnInit {

  @Input() placeholder: Ingredient;
  @Output() ingredient: EventEmitter<Ingredient>;
  newIngredientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ingredient = new EventEmitter<Ingredient>();
    // create object of initial values
    // TODO create a better way to do default values with optionals or something
    const ivals = {
      name: this.placeholder.name || '',
      qty: this.placeholder.qty || 0,
      unit: this.placeholder.unit || '',
      description: this.placeholder.description || '',
    };

    // Create the new ingredient form
    this.newIngredientForm = this.fb.group({
      name: [ivals.name, [Validators.required]],
      qty: [ivals.qty, [Validators.pattern('^(([1-9]*)|(([1-9]*)\.([0-9]*)))$'), Validators.required]],
      unit: [ivals.unit],
      description: [ivals.description],
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    const newIngredient = this.newIngredientForm.value;
    this.ingredient.emit(newIngredient);
    this.newIngredientForm.reset();
  }
}
