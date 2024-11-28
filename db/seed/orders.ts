import { orders } from '@/db/schema/orders';
import { regions } from '@/db/schema/regions';
import { discountVats } from '@/db/schema/discountVats';

export const sampleOrders = [
  {
    userId: 'user1',
    regionId: 'UZB',
    status: 'completed',
  },
  {
    userId: 'user2',
    regionId: 'KAZ',
    status: 'completed',
  },
  {
    userId: 'user3',
    regionId: 'GEO',
    status: 'pending',
  },
  {
    userId: 'user4',
    regionId: 'UKR',
    status: 'completed',
  },
  {
    userId: 'user5',
    regionId: 'CHN',
    status: 'completed',
  },
];
