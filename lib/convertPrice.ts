const conversionRates: Record<string, number> = {
  UZS: 12000, // 1 USD to UZS conversion rate
  KZT: 470, // 1 USD to KZT conversion rate
  GEL: 3.2, // 1 USD to GEL conversion rate
  UAH: 27.5, // 1 USD to UAH conversion rate
  CNY: 7, // 1 USD to CNY conversion rate
};

export function convertPrice(price: number, currency: string) {
  const rate = conversionRates[currency];
  return Number((price * rate).toFixed(2));
}
