import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListsMainComponent } from './lists-main/lists-main.component';
import { PlansMainComponent } from './plans-main/plans-main.component';
import { RecipesMainComponent } from './recipes-main/recipes-main.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recipes', component: RecipesMainComponent },
  { path: 'lists', component: ListsMainComponent },
  { path: 'plans', component: PlansMainComponent },
  { path: 'profile', component: ProfileViewComponent },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
