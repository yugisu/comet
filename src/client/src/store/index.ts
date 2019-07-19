import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './index.saga';

import { user } from './user/reducer';
import { chat } from './chat/reducer';
import { users } from './users/reducer';
import { messages } from './messages/reducer';

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = combineReducers({
    chat,
    messages,
    users,
    user,
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
