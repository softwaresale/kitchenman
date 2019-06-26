import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { 
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatInputModule, MatFormFieldModule 
} from '@angular/material';
import { RecipesDashComponent } from './recipes-dash/recipes-dash.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { DirectionListComponent } from './direction-list/direction-list.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { HomeComponent } from './home/home.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectionEditComponent } from './direction-edit/direction-edit.component';
import { IngredientInputComponent } from './ingredient-input/ingredient-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RecipesDashComponent,
    RecipeCardComponent,
    IngredientListComponent,
    ProfileViewComponent,
    RecipeViewComponent,
    DirectionListComponent,
    ProfileEditComponent,
    HomeComponent,
    RecipeEditComponent,
    DirectionEditComponent,
    IngredientInputComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
