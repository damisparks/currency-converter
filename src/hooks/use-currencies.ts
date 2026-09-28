import { useFetch } from '@/hooks/use-fetch';
import { fetchCurrencies } from '@/lib/currency-beacon';

export function useCurrencies() {
  return useFetch(fetchCurrencies, []);
}
