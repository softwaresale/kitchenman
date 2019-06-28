import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientEditFormComponent } from './ingredient-edit-form.component';

describe('IngredientEditFormComponent', () => {
  let component: IngredientEditFormComponent;
  let fixture: ComponentFixture<IngredientEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
