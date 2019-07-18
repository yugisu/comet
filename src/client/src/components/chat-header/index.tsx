import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import moment from 'moment';

import { StoreState } from '~store/types';

import './style.scss';

type Props = {};

const selectMessageAmount = createSelector(
  (state: StoreState) => state.messages.items,
  (messages) => messages.length
);

const selectLastActivity = createSelector(
  (state: StoreState) => state.messages,
  ({ items }) =>
    items.length ? moment(items[items.length - 1].created_at).fromNow() : 'never'
);

export function ChatHeader(props: Props) {
  const { name, userAmount } = useSelector(({ chat }: StoreState) => chat);

  const messageAmount = useSelector(selectMessageAmount);
  const lastActivity = useSelector(selectLastActivity);

  return (
    <header className="chat-header">
      <h3 className="chat-header__name">{name}</h3>
      <span className="chat-header__user-amount">{userAmount} users</span>
      <span className="chat-header__message-amount">{messageAmount} messages</span>
      <span className="chat-header__last-active">last activity: {lastActivity}</span>
    </header>
  );
}
