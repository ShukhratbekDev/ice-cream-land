'use client';

import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import useBasicStore from '@/hooks/useBasicStore';
import { useCart } from '@/hooks/useCart';

const FormSchema = z.object({
  createdAt: z.date({
    required_error: 'Please select a delivery date.',
  }),
});

export default function OrderForm() {
  const { data: cartItems, isLoading: isCartLoading } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { selectedRegion } = useBasicStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      if (!selectedRegion?.regionId) {
        toast({
          title: 'Region not selected',
          description: 'Please select a delivery region before proceeding.',
          variant: 'destructive',
        });
        return;
      }

      try {
        await createOrder({
          createdAt: data.createdAt,
          regionId: selectedRegion.regionId,
        });

        toast({
          title: 'Order placed successfully!',
          description: 'Your order has been received and will be processed shortly.',
        });
      } catch (err) {
        console.error('Order creation failed:', err);
        toast({
          title: 'Failed to place order',
          description:
            typeof err === 'string' ? err : 'Please try again later or contact support if the issue persists.',
          variant: 'destructive',
        });
      }
    },
    [createOrder, selectedRegion]
  );

  const isCartEmpty = !cartItems || cartItems.length === 0;
  const isSubmitDisabled = isCartEmpty || isPending || isCartLoading || !selectedRegion;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-label="Order placement form">
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel className="font-medium">
                Delivery Date
                <span className="text-destructive ml-1" aria-hidden="true">
                  *
                </span>
                <span className="sr-only">required</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full h-10 px-3',
                        'flex items-center justify-between',
                        'text-left font-normal',
                        !field.value && 'text-muted-foreground',
                        'focus-visible:ring-2 focus-visible:ring-offset-2',
                        'transition-colors duration-200'
                      )}
                      disabled={isSubmitDisabled}
                      aria-label={
                        field.value ? `Selected delivery date: ${format(field.value, 'PPP')}` : 'Select delivery date'
                      }
                    >
                      <span>{field.value ? format(field.value, 'PPP') : 'Select date'}</span>
                      <CalendarIcon className="h-4 w-4 opacity-50 shrink-0 ml-auto" aria-hidden="true" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" role="dialog" aria-label="Date picker calendar">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    initialFocus
                    aria-label="Select delivery date"
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="text-sm text-muted-foreground">
                Choose your preferred delivery date
              </FormDescription>
              <FormMessage className="text-sm font-medium text-destructive" role="alert" />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className={cn(
              'w-full h-11',
              'font-medium tracking-wide',
              'transition-all duration-200',
              isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[1px]'
            )}
            aria-label={
              isCartEmpty
                ? 'Cannot place order: Your cart is empty'
                : !selectedRegion
                  ? 'Cannot place order: Please select a delivery region'
                  : 'Place your order'
            }
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Processing...</span>
                <span className="sr-only">Please wait while we process your order</span>
              </>
            ) : (
              'Place Order'
            )}
          </Button>

          {/* Order Status Messages */}
          {isCartEmpty && (
            <p className="text-sm text-muted-foreground text-center" role="alert">
              Add items to your cart to proceed with checkout
            </p>
          )}
          {!selectedRegion && !isCartEmpty && (
            <p className="text-sm text-muted-foreground text-center" role="alert">
              Please select a delivery region to continue
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
