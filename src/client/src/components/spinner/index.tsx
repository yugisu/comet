import React from 'react';

import './style.scss';

type Props = {
  mimic?: string;
};

export function Spinner({ mimic = '' }: Props) {
  return <div className={`spinner ${mimic}`} />;
}
