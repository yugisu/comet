import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { StoreState } from '~store/types';
import { likeMessage, deleteMessage } from '~store/messages/actions';
import { toggleEditingMessage } from '~store/chat/actions';
import { useAutoScroll } from '~hooks/use-scroll-ref.hook';

import { Message } from '~components/message';

import './style.scss';

type Props = {};

const selectMessages = (state: StoreState) => state.messages.items;
const selectUser = (state: StoreState) => state.chat.currentUser.user;

export function MessageList(props: Props) {
  const messages = useSelector(selectMessages);
  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { likeMessage, deleteMessage, toggleEditingMessage },
    dispatch
  );

  const scrollRef = useAutoScroll(messages.length);

  const renderMessages = () => {
    let currentDate = '';

    return messages.flatMap((m) => {
      const res = [
        <Message
          message={m}
          key={`message-${m.id}`}
          self={currentUser === m.user}
          onDelete={actions.deleteMessage}
          onEditing={actions.toggleEditingMessage}
          onLike={actions.likeMessage}
        />,
      ];

      const messageDate = moment(m.created_at).calendar(undefined, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd, D MMMM',
        sameElse: 'D MMMM, YYYY',
        nextDay: '[Tomorrow?]',
      });
      if (currentDate !== messageDate) {
        res.unshift(
          <div className="message-list__daystamp" key={`daystamp-${messageDate}`}>
            <span>{messageDate}</span>
          </div>
        );
        currentDate = messageDate;
      }

      return res;
    });
  };

  return (
    <div className="message-list" ref={scrollRef}>
      {renderMessages()}
    </div>
  );
}
