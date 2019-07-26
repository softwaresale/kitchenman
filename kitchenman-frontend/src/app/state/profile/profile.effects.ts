import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';

import {
  ProfileActions, ProfileActionTypes, LoginProfile,
  LoginSuccess, ProfileError, LoginFailed, LogoutStatus, LoadProfiles, LoadSuccess, UpdateProfile, UpdateProfileSuccess,
} from './profile.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SessionService } from 'src/app/auth/session.service';
import { UserService } from 'src/app/profile/user.service';
import { Router } from '@angular/router';

@Injectable()
export class ProfileEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType(ProfileActionTypes.LoginProfile),
    switchMap(action => this.sessionService.login(action.loginInfo.username, action.loginInfo.password).pipe(
      map(status => {
        if (status) {
          console.log('Logged in successfully');
          return new LoginSuccess();
        } else {
          return new LoginFailed('Login failed');
        }
      })
    )),
    catchError(error => of(new LoginFailed(error))),
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(ProfileActionTypes.LoginSuccess),
    map(action => new LoadProfiles()),
    catchError(error => of(new LoginFailed(error))),
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(ProfileActionTypes.LogoutProfile),
    switchMap(action => {
      this.sessionService.logout();
      this.router.navigate(['/home']);

      return of(new LogoutStatus(true));
    }),
    catchError(error => of(new LogoutStatus(false))),
  );

  @Effect()
  loadProfile$ = this.actions$.pipe(
    ofType(ProfileActionTypes.LoadProfile),
    switchMap(action => this.userService.getUser().pipe(
      map(user => new LoadSuccess(user)),
      catchError(error => of(new ProfileError(error)))
    )),
    catchError(error => of(new ProfileError(error)))
  );

  @Effect()
  createProfile$ = this.actions$.pipe(
    ofType(ProfileActionTypes.CreateProfile),
    switchMap(action => this.sessionService.signUp(action.payload).pipe(
      map(status => {
        if (status) {
          return new LoadProfiles();
        } else {
          return new ProfileError('Could not login');
        }
      }),
      catchError(error => of(new ProfileError(error)))
    )),
    catchError(error => of(new ProfileError(error)))
  );

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType(ProfileActionTypes.UpdateProfile),
    switchMap(action => this.userService.updateUser(action.payload).pipe(
      map(status => {
        if (status) {
          return new UpdateProfileSuccess();
        } else {
          return new ProfileError('Error updating profile');
        }
      }),
      catchError(err => of(new ProfileError(err))),
    )),
    catchError(err => of(new ProfileError(err))),
  );

  @Effect()
  updateProfileSuccess$ = this.actions$.pipe(
    ofType(ProfileActionTypes.UpdateProfileSuccess),
    map(action => new LoadProfiles()),
  );

  @Effect()
  profileCheckJwt$ = this.actions$.pipe(
    ofType(ProfileActionTypes.ProfileCheckJwt),
    map(action => {
      if (action.exists) {
        return new LoginSuccess();
      } else {
        return new LoginFailed('Jwt does not already exist. You must login');
      }
    }),
    catchError(err => of(new ProfileError(err))),
  );

  constructor(
    private actions$: Actions<ProfileActions>,
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router,
  ) {}
}
