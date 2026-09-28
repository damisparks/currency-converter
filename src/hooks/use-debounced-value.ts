import { useEffect, useState } from 'react';

export function useDebouncedValue({
  value,
  delay,
}: {
  /**
   * delay in milliseconds
   */
  delay?: number;
  /**
   * Amount to convert
   */
  value: string;
}) {
  const DEFAULT_DELAY = 400;
  const ms = delay || DEFAULT_DELAY;

  const [state, setState] = useState({
    value,
  });

  useEffect(() => {
    if (!value) {
      setState({ value });
      return;
    }

    let timer: number | undefined = undefined;

    timer = setTimeout(() => {
      setState({ value });
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return state.value;
}
