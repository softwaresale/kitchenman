import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesDashComponent } from './recipe/recipes-dash/recipes-dash.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { RecipeViewComponent } from './recipe/recipe-view/recipe-view.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileGuard } from './profile/profile.guard';
import { ProfileModule } from './profile/profile.module';
import { HomeDashComponent } from './home/home-dash/home-dash.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesDashComponent, canActivate: [ProfileGuard] },
  { path: 'recipes/:id', component: RecipeViewComponent, canActivate: [ProfileGuard] },
  { path: 'recipes/edit/:id', component: RecipeEditComponent, canActivate: [ProfileGuard] },
  { path: 'profile', component: ProfileViewComponent, canActivate: [ProfileGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [ProfileGuard] },
  { path: 'home', component: HomeDashComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
