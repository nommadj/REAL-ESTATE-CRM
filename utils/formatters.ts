// FIX: Changed `import type` to a regular `import` for the `Currency` enum as it is used as a value, not just a type.
import { Currency } from '../types';

export const formatCurrency = (amount: number, currency: Currency, exchangeRate: number): string => {
  const value = currency === Currency.USD ? amount / exchangeRate : amount;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(Math.round(value));
};