import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import moment from 'moment';

import { StoreState } from '~store/types';

import './style.scss';

const selectAmounts = createSelector(
  [(state: StoreState) => state.messages.items, (state: StoreState) => state.users.items],
  (messages, users) => [messages.length, users.length]
);

const selectLastActivity = createSelector(
  (state: StoreState) => state.messages,
  ({ items }) =>
    items.length ? moment(items[items.length - 1].createdAt).fromNow() : 'never'
);

type Props = {};

export function ChatHeader(props: Props) {
  const { name } = useSelector(({ chat }: StoreState) => chat);

  const [messageAmount, usersAmount] = useSelector(selectAmounts);
  const lastActivity = useSelector(selectLastActivity);

  return (
    <header className='chat-header'>
      <h3 className='chat-header__name'>{name}</h3>
      <span className='chat-header__user-amount'>{usersAmount} users</span>
      <span className='chat-header__message-amount'>{messageAmount} messages</span>
      <span className='chat-header__last-active'>last activity: {lastActivity}</span>
    </header>
  );
}
