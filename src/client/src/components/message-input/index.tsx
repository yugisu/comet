import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addMessage } from '~store/messages/actions';
import { StoreState } from '~store/types';

import './style.scss';

type Props = {};

export function MessageInput(props: Props) {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector(({ chat }: StoreState) => chat.currentUser);

  const sendMessage = (message: string) => dispatch(addMessage(currentUser, message));

  const onChange = (e: ChangeEvent) => {
    let newMessage = (e.target as HTMLInputElement).value;

    if (newMessage.length === 1) {
      newMessage = newMessage.toUpperCase();
    }

    setMessage(newMessage);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (message) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className='message-input' onSubmit={onSubmit}>
      <input
        className='message-input__text'
        value={message}
        onChange={onChange}
        type='text'
        placeholder='Write a message...'
        aria-label='Message input'
      />
      <button className='message-input__submit'>
        <span>Send</span>{' '}
        <span role='img' aria-label='Send message'>
          ✉️
        </span>
      </button>
    </form>
  );
}
