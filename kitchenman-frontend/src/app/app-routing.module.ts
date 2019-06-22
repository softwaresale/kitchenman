import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesDashComponent } from './recipes-dash/recipes-dash.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesDashComponent },
  { path: 'recipes/:id', component: RecipeViewComponent },
  { path: 'recipes/edit/:id', component: RecipeEditComponent },
  { path: 'profile', component: ProfileViewComponent },
  { path: 'profile/edit', component: ProfileEditComponent },
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
