import React from 'react';

import { UserType } from '~../../shared/types/user.interface';

import './style.scss';

type Props = {
  user: UserType;
};

export function User({ user }: Props) {
  return (
    <div className={`user${user.role === 'ADMIN' ? ' user--admin' : ''}`}>
      <span className='user__name'>{user.username}</span>
      <img className='user__photo' src={user.avatarLink} alt={user.username} />
    </div>
  );
}
