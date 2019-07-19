import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginInfo } from '../login-info';
import { SessionService } from '../session.service';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.sass']
})
export class LoginButtonsComponent implements OnInit {

  @Input() loggedIn: boolean;
  private loginDialogRef: MatDialogRef<LoginDialogComponent>;
  private signupDialogRef: MatDialogRef<SignupDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.loginDialogRef = this.dialog.open(LoginDialogComponent);
    this.loginDialogRef.afterClosed().subscribe({
      next: (info: LoginInfo) => {
        this.sessionService.login(info.username, info.password).subscribe({
          next: (val: boolean) => this.loggedIn = val,
          error: (val: any) => console.log(val),
        });
      },
      error: (err: any) => console.log(err),
    });
  }

  onSignUp() {
    this.signupDialogRef = this.dialog.open(SignupDialogComponent);
    this.signupDialogRef.afterClosed().subscribe({
      next: (newUser: User) => {
        this.sessionService.signUp(newUser).subscribe({
          next: (val: boolean) => this.loggedIn = val,
          error: (val: any) => console.log(val),
        });
      },
      error: (val: any) => console.log(val),
    });
  }

  onLogout() {
    this.sessionService.logout();
    this.loggedIn = false;
  }
}
