export { cn } from 'cn';

/**
 * Format currency
 * @returns formatted amount
 */
export function formatCurrencyAmount({
  amount,
  currency,
}: {
  /** Amount to format */
  amount: number;
  /** Currency to use for formatting */
  currency: string;
}): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(amount);
}
