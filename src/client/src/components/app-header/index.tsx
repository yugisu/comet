import React from 'react';

import './style.scss';

export function AppHeader() {
  return (
    <div className='app-header'>
      <div className='app-header__logo'>
        <span role='img' aria-label='Chat app logo'>
          ️️☄️
        </span>
        <span>comet</span>
      </div>
    </div>
  );
}
