import { Reducer } from 'redux';

import { UsersState, UsersAction } from './types';

const initialState: UsersState = {
  items: [],
  loading: true,
  error: null,
};

export const users: Reducer<UsersState, UsersAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS/TRIGGER':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'GET_USERS/SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload.users,
      };

    case 'GET_USERS/FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'GET_USERS/FULLFILL':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
