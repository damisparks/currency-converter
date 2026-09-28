import { useEffect, useState, type DependencyList } from 'react';

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * A resuable React fetch hook with data, loading and error
 */
export function useFetch<T>(
  fetchFn: () => Promise<T>,
  deps: DependencyList,
  options: { enabled?: boolean } = {},
): FetchState<T> {
  const { enabled = true } = options;
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState((current) => ({ ...current, loading: true, error: null }));
    fetchFn()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, ...deps]);
  return state;
}
