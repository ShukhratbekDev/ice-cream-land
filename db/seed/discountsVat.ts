import { DiscountsVat } from '@/db/schema';

export const discountsVat: DiscountsVat[] = [
  { regionId: 'UZB', orderCost: '100.0', discountPercentage: '3.0', vatPercentage: '15.0' },
  { regionId: 'KAZ', orderCost: '500.0', discountPercentage: '5.0', vatPercentage: '20.0' },
  { regionId: 'GEO', orderCost: '700.0', discountPercentage: '7.0', vatPercentage: '12.0 ' },
  { regionId: 'UKR', orderCost: '1000.0', discountPercentage: '10.0', vatPercentage: '8.0' },
  { regionId: 'CHN', orderCost: '5000.0', discountPercentage: '15.0', vatPercentage: '18.0' },
];
