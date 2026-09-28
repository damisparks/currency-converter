import { useState } from 'react';
import CurrencySelector, { type CurrencySelectorProps } from '@/modules/currency-selector';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Field, FieldLabel } from '@/components/ui/field';
import { Loader2Icon } from 'lucide-react';

import { useCurrencies } from '@/hooks/use-currencies';
import { useConversion } from '@/hooks/use-conversion';
import { formatCurrencyAmount } from '@/lib/utils';

function App() {
  const { data: currencies, loading: isCurrencyLoading, error: currencyError } = useCurrencies();
  const [amount, setAmount] = useState('');

  const [fromCurrency, setFromCurrency] = useState<CurrencySelectorProps['value']>('');
  const [toCurrency, setToCurrency] = useState<CurrencySelectorProps['value']>('');

  const {
    data: conversion,
    loading: conversionIsLoading,
    error: conversionError,
  } = useConversion({
    from: fromCurrency ?? '',
    to: toCurrency ?? '',
    amount: amount,
  });

  const isAmountInvalid =
    amount !== '' && (!Number.isFinite(Number(amount)) || Number(amount) <= 0);

  return (
    <div className="flex min-h-svh p-6 flex-col">
      <div className="space-y-2">
        <h1 className="font-semibold text-3xl">Currency converter</h1>
        <p>Live exchange rates at your fingertips</p>

        <Card className="flex max-w-lg">
          <CardContent className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <CurrencySelector
                value={fromCurrency}
                hasError={!!currencyError}
                disabled={isCurrencyLoading}
                onValueChange={setFromCurrency}
                currencies={currencies ?? []}
                title="Converting from"
              />
              <Field>
                <FieldLabel htmlFor="input-convert-from">From Amount</FieldLabel>
                <Input
                  id="input-convert-from"
                  placeholder=""
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Field>
            </div>
            {currencyError && <p className="text-sm text-destructive">{currencyError.message}</p>}
            {isAmountInvalid && <p className="text-sm text-destructive">Enter a positive number</p>}

            <div className="flex gap-x-4">
              <CurrencySelector
                hasError={!!currencyError}
                value={toCurrency}
                disabled={isCurrencyLoading}
                onValueChange={setToCurrency}
                currencies={currencies ?? []}
                title="Converting to"
              />
              <Field>
                <FieldLabel htmlFor="input-convert-to">To Amount</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    readOnly
                    id="input-convert-to"
                    placeholder=""
                    value={
                      conversion
                        ? formatCurrencyAmount({
                            amount: conversion.value,
                            currency: conversion.to,
                          })
                        : ''
                    }
                  />
                  <InputGroupAddon align="inline-end">
                    {conversionIsLoading && <Loader2Icon className="animate-spin" />}
                  </InputGroupAddon>
                </InputGroup>
                {conversionError && (
                  <p className="text-sm text-destructive">{conversionError.message}</p>
                )}
              </Field>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
