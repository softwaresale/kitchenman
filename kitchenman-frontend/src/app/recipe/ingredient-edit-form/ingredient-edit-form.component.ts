import { Component, OnInit, Input, OnDestroy, HostBinding, Optional, Self, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/recipe';
import { FormBuilder, FormGroup, Validators, NgControl, ControlValueAccessor } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ingredient-edit-form',
  templateUrl: './ingredient-edit-form.component.html',
  styleUrls: ['./ingredient-edit-form.component.sass'],
  providers: [{ provide: MatFormFieldControl, useExisting: IngredientEditFormComponent }],
  // ! This is a temporary work around just to test something. This will get fixed Later
// tslint:disable-next-line: no-host-metadata-property
  host: {
    '(change)': '_onChange($event.target.value)',
    '(blur)': '_onTouched()',
  },
})
export class IngredientEditFormComponent
  implements OnInit, OnDestroy, MatFormFieldControl<Ingredient>, ControlValueAccessor {

  static nextId = 0;
// tslint:disable-next-line: variable-name
  private _onChange: (_: any) => void;
// tslint:disable-next-line: variable-name
  private _onTouched: (_: any) => void;

  @Input()
  get value(): Ingredient | null {
    if (this.newIngredientForm.valid) {
      return this.newIngredientForm.value as Ingredient;
    } else {
      return null;
    }
  }
  set value(ingredient: Ingredient | null) {
    // TODO: method to make an empty ingredient?
    ingredient = ingredient || {name: '', qty: 0, unit: '', description: ''};
    this.newIngredientForm.setValue({
      name: ingredient.name,
      qty: ingredient.qty,
      unit: ingredient.unit,
      description: ingredient.description || ''
    });

    this.stateChanges.next();
  }

  stateChanges: Subject<void>;
  @HostBinding() get id(): string { return `app-ingredient-input-${IngredientEditFormComponent.nextId++}`; }
// tslint:disable-next-line: variable-name
  private _placeholder: string;
  @Input() get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(str: string) {
    this._placeholder = str;
    this.stateChanges.next();
  }

  focused: boolean;
  get empty(): boolean {
    const ingredient: Ingredient = this.newIngredientForm.value;
    return !ingredient.name && !ingredient.qty && !ingredient.unit && !ingredient.description;
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
    return this.newIngredientForm.disabled;
  }
  set disabled(val: boolean) {
    if (val) {
      this.newIngredientForm.disable();
    } else {
      this.newIngredientForm.enable();
    }
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return !this.newIngredientForm.errors;
  }

  controlType = 'app-ingredient-input';
  newIngredientForm: FormGroup;
  @Output() addedIngredient: EventEmitter<Ingredient>;

  constructor(
    private fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this.stateChanges = new Subject<void>();
    this.addedIngredient = new EventEmitter<Ingredient>();

    // Create the new ingredient form
    this.newIngredientForm = this.fb.group({
      name: ['', [Validators.required]],
      qty: [0, [Validators.pattern('^(([1-9]*)|(([1-9]*)\.([0-9]*)))$'), Validators.required]],
      unit: ['', [Validators.required]],
      description: [''],
    });

    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]): void {
  }
  onContainerClick(event: MouseEvent): void {
  }

  onSubmit(): void {
    const newIngredient = this.newIngredientForm.value;
    this.addedIngredient.emit(newIngredient);
    this.newIngredientForm.reset();
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.stateChanges.next();
  }
  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: (_: any) => void): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.newIngredientForm.disable();
    } else {
      this.newIngredientForm.enable();
    }
  }
}
