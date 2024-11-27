type SetCurrency = { price?: number; locale?: string; currency?: string };
export const setCurrency = ({ price = 0, locale = 'en', currency = 'USD' }: SetCurrency) => {
  const { format } = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  return format(price);
};
