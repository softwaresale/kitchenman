import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { RecipesDashComponent } from './recipes-dash/recipes-dash.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { DirectionListComponent } from './direction-list/direction-list.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { HomeComponent } from './home/home.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
