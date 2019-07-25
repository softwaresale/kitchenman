import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginInfo } from '../../interfaces/login-info';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { User } from 'src/app/interfaces/user';
import { Store, select } from '@ngrx/store';
import { AppState, selectLoggedIn } from 'src/app/state/state';
import { LoginProfile, LogoutProfile, ProfileError, CreateProfile } from 'src/app/state/profile/profile.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.sass']
})
export class LoginButtonsComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  private loginDialogRef: MatDialogRef<LoginDialogComponent>;
  private signupDialogRef: MatDialogRef<SignupDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(selectLoggedIn));
  }

  onLogin() {
    this.loginDialogRef = this.dialog.open(LoginDialogComponent);
    this.loginDialogRef.afterClosed().subscribe((info: LoginInfo) => {
      this.store.dispatch(new LoginProfile(info));
    },
    (error: any) => this.store.dispatch(new ProfileError(error)));
  }

  onSignUp() {
    this.signupDialogRef = this.dialog.open(SignupDialogComponent);
    this.signupDialogRef.afterClosed().subscribe((userForm: User) => {
      this.store.dispatch(new CreateProfile(userForm));
    },
    (error: any) => this.store.dispatch(new ProfileError(error))
    );
  }

  onLogout() {
    this.store.dispatch(new LogoutProfile());
  }
}
