import { orderItems } from '@/db/schema/orderItems';
import { products } from '@/db/schema/products';

export const sampleOrderItems = [
  {
    orderId: 1, // Referencing the orderId from orders table
    productId: '1', // Vanilla Bean Delight
    quantity: 2,
    price: 2.0,
  },
  {
    orderId: 1,
    productId: '2', // Chocolate Fudge Swirl
    quantity: 1,
    price: 2.2,
  },
  {
    orderId: 2,
    productId: '3', // Strawberry Sensation
    quantity: 3,
    price: 3.0,
  },
  {
    orderId: 2,
    productId: '4', // Mint Chocolate Chip
    quantity: 2,
    price: 2.8,
  },
  {
    orderId: 3,
    productId: '5', // Cookies and Cream
    quantity: 5,
    price: 2.1,
  },
  {
    orderId: 4,
    productId: '6', // Butter Pecan
    quantity: 3,
    price: 1.9,
  },
  {
    orderId: 4,
    productId: '7', // Rocky Road
    quantity: 2,
    price: 2.3,
  },
  {
    orderId: 5,
    productId: '8', // Classic Coffee
    quantity: 2,
    price: 5.0,
  },
  {
    orderId: 5,
    productId: '9', // Pumpkin Spice
    quantity: 1,
    price: 5.0,
  },
];
