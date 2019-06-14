import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsMainComponent } from './lists-main.component';

describe('ListsMainComponent', () => {
  let component: ListsMainComponent;
  let fixture: ComponentFixture<ListsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
