import { Component, OnInit, EventEmitter, Input, Output, OnDestroy, Optional, Self, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ControlValueAccessor, NgControl } from '@angular/forms';
import { Ingredient } from 'src/app/recipe';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ingredient-list-edit',
  templateUrl: './ingredient-list-edit.component.html',
  styleUrls: ['./ingredient-list-edit.component.sass'],
  providers: [{provide: MatFormFieldControl, useExisting: IngredientListEditComponent}],
})
export class IngredientListEditComponent implements OnInit, OnDestroy, MatFormFieldControl<Ingredient[]>, ControlValueAccessor {

  static hostId = 0;

  newList: FormArray;
  @Input()
  get value(): Ingredient[] | null {
    // ! This is a workaround. Getting an error about newList being undefined
    if (this.newList) {
      if (this.newList.valid) {
        return this.newList.value;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  set value(ingredients: Ingredient[] | null) {
    ingredients = ingredients || [];
    this.newList.setValue(ingredients);
    this.stateChanges.next();
  }
  stateChanges: Subject<void>;
  @HostBinding() id = `app-ingredient-list-edit-${IngredientListEditComponent.hostId++}`;

// tslint:disable-next-line: variable-name
  private _placeholder: string;
  get placeholder(): string { return this._placeholder; }
  set placeholder(str: string) {
    this._placeholder = str;
    this.stateChanges.next();
   }

  focused: boolean;
  get empty(): boolean {
    const ingredients: Ingredient[] = this.newList.value;
    return ingredients.length === 0;
  }
  shouldLabelFloat: boolean;

// tslint:disable-next-line: variable-name
  private _required: boolean;
  get required(): boolean {
    return this._required;
  }
  set required(val: boolean) {
    this._required = val;
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this.newList.disabled;
  }

  get errorState(): boolean {
    return !this.newList.errors;
  }

  controlType = 'app-ingredient-list-edit';

  constructor(
    private fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this.stateChanges = new Subject<void>();

    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.newList = this.fb.array(this.value.map(
      // Mapping all existing ingredients
      (ingredient: Ingredient, idx: number, array: Ingredient[]) => {
        return this.fb.control(ingredient);
      })
    );
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]): void {
    throw new Error('Method not implemented.');
  }

  onContainerClick(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

  writeValue(objs: any[]): void {
    this.value = objs;
    this.stateChanges.next();
  }

  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.newList.disable();
    } else {
      this.newList.enable();
    }
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.newList.push(
      this.fb.control(ingredient)
    );
  }
}
