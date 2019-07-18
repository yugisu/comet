import React from 'react';

import './style.scss';

export function Spinner({ mimic = '' }) {
  return <div className={`spinner ${mimic}`} />;
}
