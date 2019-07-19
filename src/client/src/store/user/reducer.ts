import { UserState, UserActions } from './types';
import { Reducer } from 'redux';

const initialState: UserState = {
  isAuth: false,
  user: null,
  error: null,
  loading: false,
};

export const user: Reducer<UserState, UserActions> = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER/TRIGGER':
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };

    case 'AUTH_USER/SUCCESS':
      const { user } = action.payload;

      return {
        ...state,
        isAuth: true,
        user,
      };

    case 'AUTH_USER/FAILURE':
      return {
        ...state,
        isAuth: false,
        user: null,
        error: action.payload.message || null,
      };

    case 'AUTH_USER/FULLFILL':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
