# Custom Hooks Documentation

This directory contains documentation for all custom hooks used in the Ice Cream Land project.

## Cart Hooks

### useQuantityValidation

A hook for managing quantity input validation.

```typescript
import { useQuantityValidation } from '@/hooks/useQuantityValidation';

const {
  quantity,
  error,
  handleQuantityChange,
  incrementQuantity,
  decrementQuantity,
  validateAndSetQuantity,
  isValidQuantity,
} = useQuantityValidation({
  initialQuantity: 1,
});
```

**Parameters:**

- `initialQuantity?: number` - Initial quantity value (default: 1)

**Returns:**

- `quantity: number` - Current quantity value
- `error: string | null` - Validation error message
- `handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void` - Input change handler
- `incrementQuantity: () => void` - Increment quantity
- `decrementQuantity: () => void` - Decrement quantity
- `validateAndSetQuantity: (value: number) => void` - Validate and set quantity
- `isValidQuantity: (value: number) => boolean` - Check if quantity is valid

**Features:**

- Input validation (1-100 range)
- Error handling
- Increment/decrement functionality
- Type safety

### useAddItemToCart

Hook for adding items to the shopping cart.

```typescript
import { useAddItemToCart } from '@/hooks/useAddItemToCart';

const { mutate: addItem, isPending } = useAddItemToCart();
```

**Returns:**

- `mutate: (data: AddItemData) => void` - Function to add item
- `isPending: boolean` - Loading state

**Features:**

- Optimistic updates
- Error handling
- Loading state
- Cache invalidation

### useCalculateFinalPrice

Hook for calculating final prices with tax and discounts.

```typescript
import { useCalculateFinalPrice } from '@/hooks/useCalculateFinalPrice';

const { finalPrice, isLoading, error } = useCalculateFinalPrice(items);
```

**Parameters:**

- `items: CartItem[]` - Array of cart items

**Returns:**

- `finalPrice: number` - Calculated final price
- `isLoading: boolean` - Loading state
- `error: Error | null` - Error state

**Features:**

- Price calculation
- Tax calculation
- Discount application
- Error handling

## Best Practices

1. **Hook Design**

   - Keep hooks focused and reusable
   - Handle cleanup in useEffect
   - Use TypeScript for type safety
   - Implement proper error handling

2. **State Management**

   - Use appropriate state initialization
   - Handle all state transitions
   - Consider using reducers for complex state
   - Implement proper loading states

3. **Performance**

   - Memoize values when needed
   - Use proper dependency arrays
   - Avoid unnecessary rerenders
   - Cache expensive calculations

4. **Testing**
   - Write unit tests
   - Test error cases
   - Test state transitions
   - Test cleanup

## Hook Development Guidelines

1. **Creating New Hooks**

   - Use TypeScript
   - Add proper return types
   - Include JSDoc comments
   - Handle cleanup

2. **Error Handling**

   - Use try-catch blocks
   - Return error states
   - Provide meaningful error messages
   - Handle edge cases

3. **Documentation**

   - Add usage examples
   - Document parameters
   - Document return values
   - Include edge cases

4. **Code Review**
   - Check type safety
   - Verify error handling
   - Review performance
   - Check cleanup logic
