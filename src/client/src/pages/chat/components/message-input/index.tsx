import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { sendMessage } from '~store/messages/actions';

import './style.scss';

type Props = {};

export function MessageInput(props: Props) {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const onSendMessage = (text: string) => {
    dispatch(sendMessage(text));
  };

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
      onSendMessage(message);
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
