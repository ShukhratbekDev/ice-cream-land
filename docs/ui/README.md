# UI Components Documentation

This project uses [shadcn/ui](https://ui.shadcn.com/) for its component library, providing a collection of reusable, accessible, and customizable React components.

## Overview

shadcn/ui is built on top of:

- [Radix UI](https://www.radix-ui.com/) for accessibility
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Class Variance Authority](https://cva.style/docs) for component variants

## Components Used

### Layout Components

- `Card` - Product displays and content containers
- `Sheet` - Mobile navigation and side panels
- `Dialog` - Modal dialogs and confirmations
- `ScrollArea` - Scrollable content areas

### Form Components

- `Button` - Action buttons with variants
- `Input` - Text input fields
- `Select` - Dropdown selection
- `Checkbox` - Multi-selection controls
- `RadioGroup` - Single selection controls
- `Form` - Form validation and handling
- `Label` - Accessible form labels

### Data Display

- `Table` - Product and order lists
- `Tabs` - Content organization
- `Avatar` - User profile images
- `Badge` - Status indicators
- `Progress` - Loading states

### Navigation

- `NavigationMenu` - Main navigation
- `DropdownMenu` - Action menus
- `Breadcrumb` - Page navigation hierarchy

### Feedback

- `Toast` - Success/error notifications
- `Alert` - Important messages
- `LoadingSpinner` - Loading states

## Usage Examples

### Button Component

```tsx
import { Button } from "@/components/ui/button"

// Primary button
<Button>Add to Cart</Button>

// Secondary button
<Button variant="secondary">View Details</Button>

// Destructive button
<Button variant="destructive">Remove</Button>

// Loading state
<Button disabled>
  <LoadingSpinner className="mr-2 h-4 w-4" />
  Processing
</Button>
```

### Form Components

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

<Form {...form}>
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="email@example.com" {...field} />
        </FormControl>
      </FormItem>
    )}
  />
</Form>;
```

### Dialog Component

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
    </DialogHeader>
    <p>Are you sure you want to proceed?</p>
  </DialogContent>
</Dialog>;
```

## Customization

### Theme Colors

Colors are customized in the `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // ... other color definitions
    },
  },
}
```

### Component Variants

Custom variants can be added using Class Variance Authority:

```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // ... custom variants
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

## Best Practices

1. **Component Organization**

   - Keep components in `components/ui` directory
   - Use consistent naming conventions
   - Group related components together

2. **Accessibility**

   - Always include ARIA labels where needed
   - Maintain keyboard navigation support
   - Test with screen readers

3. **Responsive Design**

   - Use Tailwind's responsive prefixes
   - Test on multiple screen sizes
   - Consider mobile-first approach

4. **Performance**
   - Import components individually
   - Use dynamic imports for large components
   - Optimize images and animations

## Adding New Components

1. Use the shadcn/ui CLI:

   ```bash
   npx shadcn-ui@latest add [component-name]
   ```

2. Customize the component in `components/ui/[component-name].tsx`

3. Add any new variants or styles to `tailwind.config.js`

4. Document usage examples and props

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Class Variance Authority Documentation](https://cva.style/docs)
