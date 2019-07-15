import { AuthModule } from './../auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileEditComponent,
    ProfileViewComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AuthModule,
  ],
  exports: [
    ProfileEditComponent,
    ProfileViewComponent,
  ],
})
export class ProfileModule { }
