import { useLayoutEffect } from 'react';

export const useLockBodyScroll = (flag: boolean = true) => {
  useLayoutEffect(() => {
    if (flag) {
      const originalStyle = window.getComputedStyle(document.body).overflow;

      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [flag]);
};
