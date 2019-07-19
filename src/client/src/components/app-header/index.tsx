import React from 'react';

import './style.scss';
import { useSelector } from 'react-redux';
import { StoreState } from '~store/types';
import { User } from '~components/user';

export function AppHeader() {
  const currentUser = useSelector(({ user }: StoreState) => user.user);

  const onUserClick = () => {
    localStorage.removeItem('jwt');
    location.reload();
  };

  return (
    <div className='app-header'>
      <div className='app-header__logo'>
        <span role='img' aria-label='Chat app logo'>
          ️️☄️
        </span>
        <span>comet</span>
      </div>
      {currentUser && (
        <div
          className='app-header__user'
          onClick={onUserClick}
          role='button'
          tabIndex={-1}
        >
          <User user={currentUser} />
        </div>
      )}
    </div>
  );
}
