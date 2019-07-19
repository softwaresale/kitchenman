import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonsComponent } from './login-buttons/login-buttons.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { AppRoutingModule } from '../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LoginButtonsComponent, LoginButtonsComponent, LoginDialogComponent, SignupDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    LoginDialogComponent,
    SignupDialogComponent,
  ],
  exports: [LoginButtonsComponent],
})
export class AuthModule { }
