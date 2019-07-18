import { Reducer } from 'redux';

import { MessagesState, MessagesAction } from './types';

const initialState: MessagesState = {
  items: [],
  loading: true,
  error: null,
};

export const messages: Reducer<MessagesState, MessagesAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'GET_MESSAGES_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'GET_MESSAGES_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload.messages,
      };

    case 'GET_MESSAGES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        items: [...state.items, action.payload.item],
      };

    case 'EDIT_MESSAGE':
      return {
        ...state,
        items: state.items.map((m) =>
          m.id === action.payload.id ? { ...m, message: action.payload.message } : m
        ),
      };

    case 'LIKE_MESSAGE':
      return {
        ...state,
        items: state.items.map((m) =>
          m.id === action.payload.id ? { ...m, liked: !m.liked } : m
        ),
      };

    case 'DELETE_MESSAGE':
      return {
        ...state,
        items: state.items.filter((m) => m.id !== action.payload.id),
      };

    default:
      return state;
  }
};
