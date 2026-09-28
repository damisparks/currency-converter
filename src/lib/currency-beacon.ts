const beaconViteProxy = '/beacon/v1';

function notConfigured(): Error {
  return new Error('Beacon Currency API Key is missing!');
}

function invalidAmount(): Error {
  return new Error('Invalid amount');
}

/**
 * Provides the API Key
 * @returns API key as a string
 */
const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_CURRENCYBEACON_API_KEY;
  if (!apiKey) throw notConfigured();
  return apiKey;
};

// These are what's needed for the UI, the rest was intentionally omitted
export type Currency = {
  short_code: string;
  name: string;
};

export type ConvertedItem = {
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
};

export type BeaconMeta = {
  code: number;
  disclaimer?: string;
  error_type?: string;
  error_detail?: string;
};
type CurrenciesResponse = { meta: BeaconMeta; response: Currency[] };
export type ConvertCurrencyProps = {
  /**
   * Amount to convert
   */
  amount: string;
  /**
   * Currency being converted from
   */
  from: string;
  /**
   * Currency being converted to
   */
  to: string;
};
type ConvertedCurrencyResponse = { meta: BeaconMeta; response: ConvertedItem };

/**
 * Fetch the currencies
 */
export async function fetchCurrencies(): Promise<Currency[]> {
  const apiKey = getApiKey();
  const params = new URLSearchParams({ api_key: apiKey });

  const response = await fetch(`${beaconViteProxy}/currencies?${params}`);
  const data: CurrenciesResponse = await response.json();
  if (!response.ok)
    throw Error(data.meta.error_detail ?? `Failed to fetch currencies ${response.status}`);
  return data.response;
}

/**
 * The function fetch takes the currency to convert from and return the value
 */
export async function convertCurrency({
  amount,
  from,
  to,
}: ConvertCurrencyProps): Promise<ConvertedItem> {
  if (!amount || typeof amount !== 'string') throw invalidAmount();

  const apiKey = getApiKey();
  const params = new URLSearchParams({ api_key: apiKey, from, to, amount });
  const response = await fetch(`${beaconViteProxy}/convert?${params}`);

  const data: ConvertedCurrencyResponse = await response.json();
  if (!response.ok)
    throw Error(data.meta.error_detail ?? `Failed to convert currency ${response.status}`);
  return data.response;
}
