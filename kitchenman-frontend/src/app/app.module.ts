import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatGridListModule,
  MatTabsModule,
  MatCardModule,
} from '@angular/material/';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesMainComponent } from './recipes-main/recipes-main.component';
import { PlansMainComponent } from './plans-main/plans-main.component';
import { ListsMainComponent } from './lists-main/lists-main.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RecipesMainComponent,
    PlansMainComponent,
    ListsMainComponent,
    ProfileViewComponent,
    RecipeCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
