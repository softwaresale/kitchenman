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
  ],
  exports: [
    ProfileEditComponent,
    ProfileViewComponent,
  ],
})
export class ProfileModule { }
