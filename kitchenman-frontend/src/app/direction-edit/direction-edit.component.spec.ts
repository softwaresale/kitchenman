import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionEditComponent } from './direction-edit.component';

describe('DirectionEditComponent', () => {
  let component: DirectionEditComponent;
  let fixture: ComponentFixture<DirectionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
