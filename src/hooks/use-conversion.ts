import { useFetch } from '@/hooks/use-fetch';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { convertCurrency, type ConvertCurrencyProps } from '@/lib/currency-beacon';

export function useConversion({ from, to, amount }: ConvertCurrencyProps) {
  const value = useDebouncedValue({ value: amount });
  const enabled = !!from && !!to && Number.isFinite(Number(value)) && Number(value) > 0;
  return useFetch(
    () =>
      convertCurrency({
        from,
        to,
        amount: value,
      }),
    [from, to, value],
    { enabled },
  );
}
