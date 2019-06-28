import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesDashComponent } from './recipes-dash/recipes-dash.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { DirectionListComponent } from './direction-list/direction-list.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecipesDashComponent,
    RecipeCardComponent,
    RecipeViewComponent,
    RecipeEditComponent,
    IngredientListComponent,
    DirectionListComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
  ],
  exports: [
    RecipesDashComponent,
    RecipeCardComponent,
    RecipeViewComponent,
    RecipeEditComponent,
  ]
})
export class RecipeModule { }
