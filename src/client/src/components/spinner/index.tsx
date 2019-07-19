import React from 'react';

import './style.scss';

type Props = {
  mimic?: string;
  small?: boolean;
};

export function Spinner({ mimic = '', small }: Props) {
  return <div className={`spinner ${mimic} ${small ? 'spinner--small' : ''}`} />;
}
