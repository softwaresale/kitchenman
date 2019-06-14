import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesMainComponent } from './recipes-main.component';

describe('RecipesMainComponent', () => {
  let component: RecipesMainComponent;
  let fixture: ComponentFixture<RecipesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
