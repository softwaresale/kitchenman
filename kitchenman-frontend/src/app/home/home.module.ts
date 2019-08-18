import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashComponent } from './home-dash/home-dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { ActionCardComponent } from './action-card/action-card.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [HomeDashComponent, ActionCardComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ]
})
export class HomeModule { }
