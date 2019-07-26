import { Action } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';
import { LoginInfo } from 'src/app/interfaces/login-info';

export enum ProfileActionTypes {
  LoadProfile = '[Profile] Load Profiles',
  UpdateProfile = '[Profile] Update profile',
  CreateProfile = '[Profile] Create profile',
  LoginProfile = '[Profile] Login profile',
  LogoutProfile = '[Profile] Logout profile',
  LogoutStatus = '[Profile] Logout status',
  LoadSuccess = '[Profile] Load successfuly',
  LoginSuccess = '[Profile] Login Successful',
  LoginFailed = '[Profile] Login Failed',
  ProfileError = '[Profile] Error',
  UpdateProfileSuccess = '[Profile] Successfully updated',
  ProfileCheckJwt = '[Profile] Check for JWT',
}

export class LoadProfiles implements Action {
  readonly type = ProfileActionTypes.LoadProfile;
}

export class UpdateProfile implements Action {
  readonly type = ProfileActionTypes.UpdateProfile;

  constructor(public payload: User) { }
}

export class CreateProfile implements Action {
  readonly type = ProfileActionTypes.CreateProfile;

  constructor(public payload: User) { }
}

export class LogoutStatus implements Action {
  readonly type = ProfileActionTypes.LogoutStatus;

  constructor(public isLoggedOut: boolean) { }
}

export class LoginProfile implements Action {
  readonly type = ProfileActionTypes.LoginProfile;

  constructor(public loginInfo: LoginInfo) { }
}

export class LogoutProfile implements Action {
  readonly type = ProfileActionTypes.LogoutProfile;

  constructor() { }
}

export class LoginSuccess implements Action {
  readonly type = ProfileActionTypes.LoginSuccess;

  constructor() { }
}

export class LoginFailed implements Action {
  readonly type = ProfileActionTypes.LoginFailed;

  constructor(public payload: any) { }
}

export class ProfileError implements Action {
  readonly type = ProfileActionTypes.ProfileError;

  constructor(public info: any) { }
}

export class LoadSuccess implements Action {
  readonly type = ProfileActionTypes.LoadSuccess;

  constructor(public payload: User) { }
}

export class UpdateProfileSuccess implements Action {
  readonly type = ProfileActionTypes.UpdateProfileSuccess;

  constructor() { }
}

export class ProfileCheckJwt implements Action {
  readonly type = ProfileActionTypes.ProfileCheckJwt;

  constructor(public exists: boolean) { }
}

export type ProfileActions
  = LoadProfiles
  | UpdateProfile
  | CreateProfile
  | LogoutStatus
  | LoginProfile
  | LogoutProfile
  | LoginSuccess
  | LoginFailed
  | LoadSuccess
  | ProfileError
  | UpdateProfileSuccess
  | ProfileCheckJwt;
