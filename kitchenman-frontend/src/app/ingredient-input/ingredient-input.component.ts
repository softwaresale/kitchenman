import { Component, OnInit, Input, OnDestroy, HostBinding, Optional, Self } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { Ingredient } from '../recipe';
import { Observable, Subject } from 'rxjs';
import { NgControl, FormGroup, FormBuilder, Validators, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-ingredient-input',
  templateUrl: './ingredient-input.component.html',
  styleUrls: ['./ingredient-input.component.sass']
})
export class IngredientInputComponent
  implements MatFormFieldControl<Ingredient>, OnInit, OnDestroy, ControlValueAccessor {

  static hostid = 0;

  private _required = false;
  private _disabled = false;

  @Input()
  get value(): Ingredient | null {
    const ingredient = this.ingredientForm.value;
    if (ingredient.name && ingredient.qty) {
      return ingredient;
    } else {
      return null;
    }
  }
  set value(ingredient: Ingredient | null) {
    if (ingredient) {
      this.ingredientForm.setValue({
        name: ingredient.name,
        qty: ingredient.qty,
        unit: ingredient.unit,
        description: ingredient.description,
      });
      this.stateChanges.next();
    }
  }

  stateChanges: Subject<void>;
  @HostBinding() id = `app-ingredient-input-${IngredientInputComponent.hostid++}`;
  placeholder: string;
  focused: boolean;

  get empty(): boolean {
    const ing = this.ingredientForm.value;
    return !ing.name && !ing.qty && !ing.unit && !ing.description;
  }

  shouldLabelFloat: boolean;

  get required(): boolean {
    return this._required;
  }
  set required(req: boolean) {
    this._required = req;
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(req: boolean) {
    this._disabled = req;
    this._disabled ? this.ingredientForm.disable() : this.ingredientForm.enable();
    this.stateChanges.next();
  }

  errorState = false;

  ingredientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.stateChanges = new Subject<void>();

    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      qty: [0, Validators.required],
      unit: [''],
      description: ['']
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]): void {
  }

  onContainerClick(event: MouseEvent): void {
  }

  writeValue(obj: Ingredient): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    throw new Error('Method not implemented');
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented');
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.ingredientForm.disable();
    }
  }
}
