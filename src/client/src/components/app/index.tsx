import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { StoreState } from '~store/types';

import { Chat } from '~pages/chat';
import { Auth } from '~pages/auth';
import { ErrorBoundary } from '~components/error-boundary';
import { AppHeader } from '~components/app-header';

import './style.scss';

export function App() {
  const isAuth = useSelector((state: StoreState) => state.user.isAuth);

  return (
    <div className='app'>
      <AppHeader />
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/auth' />
            </Route>
            <Route path='/chat'>{isAuth ? <Chat /> : <Redirect to='/auth' />}</Route>
            <Route path='/auth'>{isAuth ? <Redirect to='/chat' /> : <Auth />}</Route>
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}
