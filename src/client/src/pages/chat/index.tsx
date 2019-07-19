import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StoreState } from '~store/types';
import { fetchMessages } from '~store/messages/routines';

import { UsersList } from './components/users-list';
import { ChatHeader } from './components/chat-header';
import { MessageList } from './components/message-list';
import { MessageInput } from './components/message-input';

import './style.scss';
import { fetchUsers } from '~store/users/routines';
import { CardPage } from '~components/page-card';

export function Chat() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
    dispatch(fetchUsers());
  }, [dispatch]);

  const { loading: messagesLoading, error: mError } = useSelector(
    ({ messages }: StoreState) => messages
  );

  const { loading: usersLoading, error: uError } = useSelector(
    ({ users }: StoreState) => users
  );

  if (mError) throw mError;
  if (uError) throw uError;

  return (
    <CardPage
      loading={messagesLoading || usersLoading}
      header={<ChatHeader />}
      content={
        <div className='chat__content'>
          <MessageList />
          <MessageInput />
        </div>
      }
      tooltip={<UsersList />}
    />
  );
}
