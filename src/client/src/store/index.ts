import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { chat } from './chat/reducer';
import { messages } from './messages/reducer';

const rootReducer = combineReducers({
  chat,
  messages,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
