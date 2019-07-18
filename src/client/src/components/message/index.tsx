import React from 'react';
import moment from 'moment';

import { MessageType } from '~types/message.type';

import './style.scss';

type Props = {
  message: MessageType;
  self?: boolean;
  onDelete: (id: string) => any;
  onEditing: (msg: MessageType) => any;
  onLike: (id: string) => any;
};

export function Message({ message, self = false, ...props }: Props) {
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
              {message.liked ? '💔' : '💖'}
            </span>
          </button>
        )}
      </div>
      {!self && (
        <>
          <img className='message__avatar' src={message.avatar} alt={`${message.user}`} />
          <span className='message__user'>{message.user}</span>
        </>
      )}
      <span className='message__text'>{message.message}</span>
      <span className='message__time'>{moment(message.created_at).format('kk:mm')}</span>
    </div>
  );
}
