import { useEffect } from 'react';

export const useKeypress = (keyCode: number, action: Function) => {
  const handler = (e: KeyboardEvent) => {
    if (e.keyCode === keyCode) {
      action();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [keyCode, action]);
};
