import React from 'react';
import moment from 'moment';

import { MessageType } from '~../../shared/types/message.interface';
import { UserType } from '~../../shared/types/user.interface';

import './style.scss';

type Props = {
  message: MessageType;
  user: UserType;
  self: boolean;
  onDelete: (id: number) => void;
  onEditing: (msg: MessageType) => void;
  onLike: (id: number) => void;
};

export function Message({ message, user, self = false, ...props }: Props) {
  return (
    <div className={`message${self ? ' message--self' : ''}`}>
      <div className='message__tooltip'>
        {self ? (
          <>
            <button onClick={() => props.onEditing(message)}>
              <span role='img' aria-label='Edit message'>
                ✏️️
              </span>
            </button>
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
      <span className='message__time'>{moment(message.createdAt).format('kk:mm')}</span>
    </div>
  );
}
