import CartItems from '@/components/CartItems';
import CartTotalDetails from '@/components/CartTotalDetails';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import OrderForm from '@/components/OrderForm';

export default function OrderCart() {
  return (
    <section className="justify-items-center">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6 md:p-6">
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Your Shopping Cart</CardTitle>
              </CardHeader>
              <CardContent>
                <CartItems />
              </CardContent>
            </Card>
          </div>
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <CartTotalDetails openCollapse={true} />
                <OrderForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
