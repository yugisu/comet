import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '~store/types';

import { User } from '~components/user';

type Props = {};

const usersSelector = (state: StoreState) => state.users;

export function UsersList(props: Props) {
  const { items } = useSelector(usersSelector);

  return (
    <>
      {items.map((u) => (
        <User user={u} key={`user-${u.id}`} />
      ))}
    </>
  );
}
