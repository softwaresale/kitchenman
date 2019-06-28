import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientListEditComponent } from './ingredient-list-edit.component';

describe('IngredientListEditComponent', () => {
  let component: IngredientListEditComponent;
  let fixture: ComponentFixture<IngredientListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
