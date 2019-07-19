import { UserType } from '~../../shared/types/user.interface';

export type UsersState = {
  items: UserType[];
  loading: boolean;
  error: string | null;
};

type GetUsersTrigger = {
  type: 'GET_USERS/TRIGGER';
};

type GetUsersRequest = {
  type: 'GET_USERS/REQUEST';
};

type GetUsersSuccess = {
  type: 'GET_USERS/SUCCESS';
  payload: {
    users: UserType[];
  };
};

type GetUsersFailure = {
  type: 'GET_USERS/FAILURE';
  payload: {
    error: string;
  };
};

type GetUsersFullfill = {
  type: 'GET_USERS/FULLFILL';
};

export type SendUser = {
  type: 'SEND_USER';
  payload: {
    text: string;
  };
};

type AddUser = {
  type: 'ADD_USER';
  payload: {
    item: UserType;
  };
};

export type PatchUser = {
  type: 'PATCH_USER';
  payload: {
    user: UserType;
  };
};

type EditUser = {
  type: 'EDIT_USER';
  payload: {
    id: number;
    user: UserType;
  };
};

type DeleteUser = {
  type: 'DELETE_USER';
  payload: {
    id: number;
  };
};

export type UsersAction =
  | GetUsersTrigger
  | GetUsersRequest
  | GetUsersSuccess
  | GetUsersFailure
  | GetUsersFullfill
  | AddUser
  | EditUser
  | DeleteUser;
