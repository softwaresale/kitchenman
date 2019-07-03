import { Component, OnInit, Input, Output, OnDestroy, HostBinding, Optional, Self, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Ingredient } from 'src/app/recipe';
import { FormGroup, FormBuilder, FormArray, NgControl, ControlValueAccessor, FormControl } from '@angular/forms';
import { MatTableDataSource, MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ingredients-edit',
  templateUrl: './ingredients-edit.component.html',
  styleUrls: ['./ingredients-edit.component.sass'],
  providers: [{provide: MatFormFieldControl, useExisting: IngredientsEditComponent}],
})
export class IngredientsEditComponent implements OnInit, OnDestroy, OnChanges, MatFormFieldControl<Ingredient[]>, ControlValueAccessor {

  static hostId = 0;

  @Input() initial: Ingredient[];

  @Input()
  get value(): Ingredient[] | null {
    if (this.ingredientsForm) {
      const ingredientsArray: FormArray = this.ingredientsForm.get('ingredients') as FormArray;
      if (ingredientsArray.valid) {
        return ingredientsArray.value;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  set value(ingredients: Ingredient[] | null) {
    ingredients = ingredients || [];
    this.ingredientsForm.get('ingredients').setValue(ingredients);
    this.stateChanges.next();
  }
  stateChanges: Subject<void>;
  @HostBinding() id = `app-ingredients-edit-${IngredientsEditComponent.hostId++}`;
  placeholder: string;
  focused: boolean;
  get empty(): boolean {
    return this.value.length === 0;
  }
  shouldLabelFloat: boolean;
// tslint:disable-next-line: variable-name
  private _required = false;
  get required(): boolean {
    return this._required;
  }
  set required(val: boolean) {
    this._required = val;
    this.stateChanges.next();
  }
// tslint:disable-next-line: variable-name
  private _disabled = false;
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(val: boolean) {
    this._disabled = val;
    this._disabled ? this.ingredientsForm.disable() : this.ingredientsForm.enable();
    this.stateChanges.next();
  }
  get errorState(): boolean {
    return !this.ingredientsForm.errors;
  }
  controlType?: string;
  autofilled?: boolean;

  columnsToDisplay = ['name', 'qty', 'unit', 'description'];
  ingredientData: MatTableDataSource<Ingredient>;
  ingredientsForm: FormGroup;
  get ingredientsArray(): FormArray { return this.ingredientsForm.get('ingredients') as FormArray; }
  get newIngredient(): FormGroup { return this.ingredientsForm.get('newIngredient') as FormGroup; }

  constructor(
    private fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this.stateChanges = new Subject<void>();
    this.ingredientData = new MatTableDataSource<Ingredient>();
    if (this.ngControl !== null) {
      console.log(`${this.id}: control is registered`);
      this.ngControl.valueAccessor = this;
    }

    this.createForm();
  }

  ngOnInit() {
    if (this.value) {
      this.bindForm();
      console.log('form bound');
    } else {
      console.log('value was null, so form not bound');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.value) {
      this.ingredientData = new MatTableDataSource<Ingredient>(this.value);
    } else {
      console.log('value is null');
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]): void {
  }
  onContainerClick(event: MouseEvent): void {
  }
  writeValue(obj: Ingredient[]): void {
    this.ingredientData.data = obj;
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  createForm(): void {
    this.ingredientsForm = this.fb.group({
      ingredients: this.fb.array([]),
      newIngredient: this.fb.group({
        name: [''],
        qty: [0],
        unit: [''],
        description: [''],
      }),
    });
  }

  bindForm(): void {
    this.value.forEach((value: Ingredient, idx: number, array: Ingredient[]) => {
      this.ingredientsArray.push(this.fb.group({
        name: [value.name],
        qty: [value.qty],
        unit: [value.unit],
        description: [value.description],
      }));
    });
  }

  onAddIngredient(): void {
    // Get the ingredient
    // TODO check validity for all
    const newIngredient: Ingredient = this.newIngredient.value;
    // Add the ingredient to the array
    // ? For now, I am adding a new form. Should I just add the `newIngredientForm` directly?
    this.ingredientsArray.push(this.fb.group({
      name: [newIngredient.name],
      qty: [newIngredient.qty],
      unit: [newIngredient.unit],
      description: [newIngredient.description],
    }));

    this.newIngredient.reset();
  }
}
