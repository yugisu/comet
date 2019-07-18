import { useEffect, useRef } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */

export function useAutoScroll(...deps: any[]) {
  const ref = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, deps);

  return ref;
}
