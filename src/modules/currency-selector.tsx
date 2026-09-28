import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Field, FieldLabel } from '@/components/ui/field';
import type { Currency } from '@/lib/currency-beacon';
import { useId } from 'react';

export type CurrencySelectorProps = {
  currencyPlaceholder?: string;
  currencies: Currency[];
  title: string;
  value?: null | string;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
  hasError?: boolean;
};

function CurrencySelector({
  currencyPlaceholder,
  currencies,
  title,
  value,
  onValueChange,
  disabled,
  hasError,
}: CurrencySelectorProps) {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>{title}</FieldLabel>
      <Combobox<string, false, Currency>
        disabled={disabled}
        items={currencies}
        value={value}
        onValueChange={onValueChange}
        filter={(currency, query) => {
          const q = query.toLowerCase();
          return (
            currency.short_code.toLowerCase().includes(q) || currency.name.toLowerCase().includes(q)
          );
        }}
      >
        <ComboboxInput
          id={id}
          aria-invalid={hasError}
          placeholder={currencyPlaceholder || 'Choose your currency'}
        />
        <ComboboxContent>
          <ComboboxEmpty>Oops! nothing matched your search 😅</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.short_code} value={item.short_code}>
                {item.short_code} {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
export default CurrencySelector;
