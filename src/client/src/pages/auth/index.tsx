import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, withRouter, Switch, Link } from 'react-router-dom';
import { History } from 'history';

import { StoreState } from '~store/types';
import { authUser } from '~store/user/routines';

import { CardPage } from '~components/page-card';

import './style.scss';

type Credentials = {
  username: string;
  password: string;
  [k: string]: string;
};

type Props = {
  history: History;
};

export const Auth = withRouter(({ history }: Props) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: StoreState) => state.user);
  const isLogin = !history.location.pathname.includes('register');

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  const [values, setValues] = useState<Credentials>({
    username: '',
    password: '',
    avatarLink: '',
  });

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    setValues((values) => ({ ...values, [target.name]: target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (values.password && values.password) {
      dispatch(authUser({ ...values, type: isLogin ? 'login' : 'register' }));
    }
  };

  return (
    <CardPage
      className='login-page'
      header={<h2>{isLogin ? 'Login' : 'Sign up'}</h2>}
      content={
        <form className='login-form' onSubmit={onSubmit}>
          {error && <div className='login-form__error'>{error + ''}</div>}
          <input
            className='login-form__username'
            value={values.username}
            type='text'
            name='username'
            onChange={onChange}
            placeholder='Username'
          />
          <input
            className='login-form__password'
            value={values.password}
            type='password'
            name='password'
            onChange={onChange}
            placeholder='Password'
          />
          {!isLogin && (
            <input
              className='login-form__avatar'
              value={values.avatarLink}
              name='avatarLink'
              onChange={onChange}
              placeholder='Link to avatar'
            />
          )}
          <button className='login-form__submit' type='submit'>
            {isLogin ? 'Login' : 'Sign up'}
          </button>
          <Link
            className='login-form__statement'
            to={isLogin ? '/auth/register' : '/auth/login'}
          >
            {isLogin ? 'Create account' : 'Log in '}
          </Link>
        </form>
      }
    />
  );
});
