
import { ProfileActions, ProfileActionTypes } from './profile.actions';
import { User } from 'src/app/interfaces/user';

export interface State {
  user: User;
  isError: boolean;
  errorData: any;
  loggedIn: boolean;
}

export const initialState: State = {
  user: null,
  isError: false,
  errorData: null,
  loggedIn: false,
};

export function reducer(state = initialState, action: ProfileActions): State {
  switch (action.type) {

    case ProfileActionTypes.LoadProfile:
      return state;

    case ProfileActionTypes.LoginFailed:
      return { ...state, user: null, isError: true, errorData: action.payload, loggedIn: false };

    case ProfileActionTypes.LoginSuccess:
      return { ...state, loggedIn: true };

    case ProfileActionTypes.LoadSuccess:
      return { ...state, user: action.payload, isError: false, errorData: null };

    case ProfileActionTypes.ProfileError:
      return { ...state, isError: true, errorData: action.info };

    case ProfileActionTypes.LogoutStatus:
      return { ...state, isError: !action.isLoggedOut, loggedIn: action.isLoggedOut, user: (action.isLoggedOut) ? null : state.user };

    default:
      return state;
  }
}
