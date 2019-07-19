import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { StoreState } from '~store/types';
import { messageService } from '~services/messages.service';
import { editMessage, patchMessage } from '~store/messages/actions';

import { CardPage } from '~components/page-card';
import { Spinner } from '~components/spinner';

import './style.scss';

export const MessageEdit = withRouter(({ match: { params: { id } }, history }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    messageService
      .getOneById(id)
      .then((m) => setText(m.body))
      .catch(() => location.replace('/chat'));
  }, [id]);

  const onTextInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setText(target.value);
  };

  const onSubmit = () => {
    if (text) {
      dispatch(patchMessage(id, text));
      history.replace('/chat');
    }
  };

  return (
    <CardPage
      header={<h2>Edit message</h2>}
      content={
        text === null ? (
          <Spinner />
        ) : (
          <div className='modal__content'>
            <textarea
              className='modal__text'
              value={text}
              onChange={onTextInput}
              rows={10}
            />
            <Link role='button' to='/chat' className='modal__close'>
              <span role='img' aria-hidden>
                ❌
              </span>
            </Link>
            <button className='modal__submit' onClick={onSubmit}>
              <span>Submit</span>{' '}
              <span role='img' aria-hidden>
                ✔️
              </span>
            </button>
          </div>
        )
      }
    />
  );
});
