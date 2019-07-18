import React from 'react';

import { ErrorBoundary } from '~components/error-boundary';
import { AppHeader } from '~components/app-header';
import { MessageModal } from '~components/message-modal';
import { Chat } from '~components/chat';

import './style.scss';

export function App() {
  return (
    <div className='app'>
      <AppHeader />
      <ErrorBoundary>
        <Chat />
        <MessageModal />
      </ErrorBoundary>
    </div>
  );
}
