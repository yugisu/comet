import React from 'react';

import { Spinner } from '~components/spinner';

import './style.scss';

type Props = {
  className?: string;
  loading?: boolean;
  header: React.ReactNode;
  content: React.ReactNode;
  tooltip?: React.ReactNode;
};

export function CardPage({ loading, header, content, tooltip, className = '' }: Props) {
  return loading ? (
    <Spinner />
  ) : (
    <div className={`page-card ${className}`}>
      <header className='page-card__header'>{header}</header>
      <main className='page-card__content'>{content}</main>
      {tooltip && <div className='page-card__tooltip'>{tooltip}</div>}
    </div>
  );
}
