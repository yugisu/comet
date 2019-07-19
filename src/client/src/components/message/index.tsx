import React from 'react';
import moment from 'moment';

import { MessageType } from '~../../shared/types/message.interface';
import { UserType } from '~../../shared/types/user.interface';

import './style.scss';
import { Link } from 'react-router-dom';

type Props = {
  message: MessageType;
  user: UserType;
  self: boolean;
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
};

export function Message({ message, user, self = false, ...props }: Props) {
  return (
    <div className={`message${self ? ' message--self' : ''}`}>
      <div className='message__tooltip'>
        {self ? (
          <>
            <Link to={`/chat/edit/${message.id}`} role='button'>
              <span role='img' aria-label='Edit message'>
                ✏️️
              </span>
            </Link>
            <button onClick={() => props.onDelete(message.id)}>
              <span role='img' aria-label='Delete message'>
                🗑️
              </span>
            </button>
          </>
        ) : (
          <button onClick={() => props.onLike(message.id)}>
            <span role='img' aria-label='Delete message'>
              {message.likes ? '💔' : '💖'}
            </span>
          </button>
        )}
      </div>
      {!self && (
        <>
          <img
            className='message__avatar'
            src={user.avatarLink}
            alt={`${message.username}`}
          />
          <span className='message__user'>{message.username}</span>
        </>
      )}
      <span className='message__text'>{message.body}</span>
      <span className='message__time'>
        {moment(message.createdAt)
          .add({ h: 3 })
          .format('hh:mm a')}
      </span>
    </div>
  );
}
