import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { StoreState } from '~store/types';
import { likeMessage, deleteMessage } from '~store/messages/actions';
import { useAutoScroll } from '~hooks/use-scroll-ref.hook';

import { Message } from '~components/message';

import './style.scss';

type Props = {};

const selectMessages = (state: StoreState) => state.messages.items;
const selectUsers = (state: StoreState) => state.users;
const selectCurrentUsername = (state: StoreState) =>
  state.user.user ? state.user.user.username : null;

export function MessageList(props: Props) {
  const messages = useSelector(selectMessages);
  const { items: users, loading: usersLoading } = useSelector(selectUsers);
  const currentUser = useSelector(selectCurrentUsername);

  const dispatch = useDispatch();
  const actions = bindActionCreators({ likeMessage, deleteMessage }, dispatch);

  const scrollRef = useAutoScroll(messages.length);

  const renderMessages = () => {
    let currentDate = '';

    return messages.flatMap((m) => {
      const messageSender = users.find((u) => u.username === m.username)!;

      const res = [
        <Message
          message={m}
          user={messageSender}
          self={currentUser === m.username}
          key={`message-${m.id}`}
          onDelete={() => {}}
          onEditing={() => {}}
          onLike={() => {}}
        />,
      ];

      const messageDate = moment(m.createdAt).calendar(undefined, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd, D MMMM',
        sameElse: 'D MMMM, YYYY',
        nextDay: '[Tomorrow?]',
      });
      if (currentDate !== messageDate) {
        res.unshift(
          <div className='message-list__daystamp' key={`daystamp-${messageDate}`}>
            <span>{messageDate}</span>
          </div>
        );
        currentDate = messageDate;
      }

      return res;
    });
  };

  return (
    <div className='message-list' ref={scrollRef}>
      {!usersLoading && renderMessages()}
    </div>
  );
}
