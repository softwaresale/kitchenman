import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansMainComponent } from './plans-main.component';

describe('PlansMainComponent', () => {
  let component: PlansMainComponent;
  let fixture: ComponentFixture<PlansMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
