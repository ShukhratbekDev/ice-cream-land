import { Suspense } from 'react';
import CartItems from '@/components/CartItems';
import CartTotalDetails from '@/components/CartTotalDetails';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import OrderForm from '@/components/OrderForm';
import { Skeleton } from '@/components/ui/skeleton';

function CartItemsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OrderCart() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-muted/10" aria-labelledby="order-cart-title">
      <div className="container max-w-7xl mx-auto py-6 md:py-8 lg:py-10">
        <div className="px-4 md:px-6">
          <h1 id="order-cart-title" className="text-3xl font-bold tracking-tight mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Cart Items Section */}
            <section className="lg:col-span-8" aria-label="Shopping cart items">
              <Card className="h-full">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-xl font-semibold">Your Shopping Cart</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<CartItemsSkeleton />}>
                    <CartItems />
                  </Suspense>
                </CardContent>
              </Card>
            </section>

            {/* Order Summary Section */}
            <section className="lg:col-span-4" aria-label="Order summary">
              <div className="lg:sticky lg:top-24 space-y-6">
                <Card>
                  <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Suspense
                      fallback={
                        <div className="space-y-4">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      }
                    >
                      <CartTotalDetails openCollapse={true} />
                    </Suspense>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-xl font-semibold">Order Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OrderForm />
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
