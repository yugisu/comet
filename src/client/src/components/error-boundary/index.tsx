import React from 'react';

import './style.scss';

type State = {
  error: Error | string | null;
};

export class ErrorBoundary extends React.Component<{}, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error | string) {
    return { error };
  }

  componentDidCatch() {}

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div className='error-boundary'>
          <h1 className='error-boundary__title'>
            <span>Uh oh! Something went wrong!</span>{' '}
            <span role='img' aria-hidden='true'>
              💥
            </span>
          </h1>
          {error instanceof Error ? (
            <>
              <h3>{error.name}</h3>
              <p>{error.message}</p>
            </>
          ) : (
            <p>Error: {error}</p>
          )}

          <button onClick={() => window.location.reload()}>Refresh page</button>
        </div>
      );
    }

    return this.props.children;
  }
}
