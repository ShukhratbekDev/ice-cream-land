# Components Documentation

This directory contains documentation for all reusable components in the Ice Cream Land project.

## Cart Components

### ShoppingCartSidebar

A responsive slide-out cart sidebar component that displays the current shopping cart items and total.

**Features:**

- Keyboard navigation support (ESC to close)
- Body scroll lock when open
- Responsive design (adjusts width based on screen size)
- Accessible with ARIA labels
- Smooth animations and transitions

**Usage:**

```tsx
<ShoppingCartSidebar />
```

### CartTotalDetails

Displays a collapsible breakdown of the cart total, including subtotal, discounts, taxes, and shipping.

**Features:**

- Collapsible details view
- Dynamic price calculations
- Multi-currency support
- Regional pricing support
- Tax and discount display with badges

**Props:**

```tsx
interface CartTotalDetailsProps {
  openCollapse?: boolean;
}
```

### UpdateItemInCart

Allows users to modify the quantity of items in their cart or remove them entirely.

**Features:**

- Quantity validation (1-100 range)
- Increment/decrement controls
- Delete item functionality
- Loading states for operations

**Props:**

```tsx
interface UpdateItemInCartProps {
  itemInCart: CartItemWithProduct;
}
```

### QuantityInput

A reusable quantity input component with validation and controls.

**Features:**

- Min/max quantity validation
- Increment/decrement buttons
- Error state display
- Accessible controls

**Props:**

```tsx
interface QuantityInputProps {
  quantity: number;
  error?: string;
  onQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}
```

## Form Components

### OrderForm

A comprehensive form component for placing orders.

**Features:**

- Date picker for delivery date
- Form validation using Zod
- Error handling and toast notifications
- Region validation
- Loading states

**Validation Schema:**

```tsx
const FormSchema = z.object({
  createdAt: z.date({
    required_error: 'Please select a delivery date.',
  }),
});
```

## UI Components

### Card

A flexible card component for displaying content in a contained space.

**Subcomponents:**

- CardHeader
- CardTitle
- CardDescription
- CardContent
- CardFooter

**Usage:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### NavigationMenu

A fully accessible navigation menu component built with Radix UI.

**Features:**

- Keyboard navigation
- Dropdown support
- Responsive design
- Animation effects
- ARIA compliance

**Subcomponents:**

- NavigationMenuList
- NavigationMenuItem
- NavigationMenuTrigger
- NavigationMenuContent
- NavigationMenuLink
- NavigationMenuIndicator
- NavigationMenuViewport

### Tooltip

A lightweight tooltip component for displaying additional information.

**Features:**

- Customizable positioning
- Animation effects
- Portal rendering
- ARIA compliance

**Usage:**

```tsx
<Tooltip>
  <TooltipTrigger>Trigger Element</TooltipTrigger>
  <TooltipContent>Tooltip Content</TooltipContent>
</Tooltip>
```

### Pagination

A comprehensive pagination component for navigating through multiple pages.

**Features:**

- Previous/Next navigation
- Page number display
- Customizable styling
- Accessible controls

**Components:**

- PaginationPrevious
- PaginationNext
- PaginationLink
- PaginationEllipsis

### Accordion

An expandable/collapsible content component.

**Features:**

- Smooth animations
- Keyboard navigation
- Customizable styling
- ARIA compliance

**Usage:**

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Best Practices

1. **Accessibility**

   - Use semantic HTML elements
   - Include ARIA labels and roles
   - Support keyboard navigation
   - Maintain focus management

2. **Performance**

   - Implement proper loading states
   - Use React.memo for expensive renders
   - Optimize re-renders with useCallback/useMemo
   - Implement proper error boundaries

3. **State Management**

   - Use appropriate hooks for state
   - Implement proper error handling
   - Handle loading states
   - Maintain consistent state updates

4. **Styling**

   - Use Tailwind CSS utilities
   - Maintain consistent spacing
   - Follow responsive design principles
   - Use CSS variables for theming

5. **Testing**
   - Write unit tests for components
   - Test accessibility features
   - Test error states
   - Test loading states
