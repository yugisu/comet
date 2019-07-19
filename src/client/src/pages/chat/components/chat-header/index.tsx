import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { StoreState } from '~store/types';

import './style.scss';

type Props = {};

const selectMessageAmount = createSelector(
  (state: StoreState) => state.messages.items,
  (messages) => messages.length
);

const selectUsersAmount = createSelector(
  (state: StoreState) => state.users.items,
  (users) => users.length
);

const selectLastActivity = createSelector(
  (state: StoreState) => state.messages,
  ({ items }) =>
    items.length ? moment(items[items.length - 1].createdAt).fromNow() : 'never'
);

export function ChatHeader(props: Props) {
  const { name } = useSelector(({ chat }: StoreState) => chat);

  const messageAmount = useSelector(selectMessageAmount);
  const usersAmount = useSelector(selectUsersAmount);
  const lastActivity = useSelector(selectLastActivity);

  return (
    <div className='chat-header'>
      <h3 className='chat-header__name'>{name}</h3>
      <span className='chat-header__user-amount'>{usersAmount} users</span>
      <span className='chat-header__message-amount'>{messageAmount} messages</span>
      <span className='chat-header__last-active'>last activity: {lastActivity}</span>
    </div>
  );
}
