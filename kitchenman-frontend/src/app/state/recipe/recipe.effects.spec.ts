import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RecipeEffects } from './recipe.effects';

describe('RecipeEffects', () => {
  let actions$: Observable<any>;
  let effects: RecipeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<RecipeEffects>(RecipeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
