import React, { useEffect } from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';

import { StoreState } from '~store/types';
import { getMessages } from '~store/messages/actions';
import { toggleEditingMessage } from '~store/chat/actions';
import { useKeypress } from '~hooks/use-key-press.hook';

import { ChatHeader } from '~components/chat-header';
import { MessageList } from '~components/message-list';
import { MessageInput } from '~components/message-input';
import { Spinner } from '~components/spinner';

import './style.scss';

const selectLatestOwnMessage = createSelector(
  [
    (state: StoreState) => state.messages.items,
    (state: StoreState) => state.chat.currentUser.user,
  ],
  (messages, username) => {
    const ms = [...messages];
    return ms.reverse().find((m) => m.user === username);
  }
);

export function Chat() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const { loading, error } = useSelector(({ messages }: StoreState) => messages);
  const latestOwnMessage = useSelector(selectLatestOwnMessage);

  useKeypress(38, () => dispatch(toggleEditingMessage(latestOwnMessage)));

  if (error) throw error;

  return loading ? (
    <Spinner />
  ) : (
    <div className="chat">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
}
