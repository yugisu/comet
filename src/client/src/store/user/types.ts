import { UserType } from '~../../shared/types/user.interface';

export type UserState = {
  isAuth: boolean;
  user: UserType | null;
  error: string | null;
  loading: boolean;
};

export type AuthUserTrigger = {
  type: 'AUTH_USER/TRIGGER';
  payload: {
    username: string;
    password: string;
  };
};

export type AuthUserRequest = {
  type: 'AUTH_USER/REQUEST';
};

export type AuthUserSuccess = {
  type: 'AUTH_USER/SUCCESS';
  payload: {
    user: UserType;
  };
};

export type AuthUserFailure = {
  type: 'AUTH_USER/FAILURE';
  payload: {
    message?: string;
  };
};

export type AuthUserFullfill = {
  type: 'AUTH_USER/FULLFILL';
};

export type UserActions =
  | AuthUserTrigger
  | AuthUserRequest
  | AuthUserSuccess
  | AuthUserFailure
  | AuthUserFullfill;
