import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrderDetails from "@/components/OrderDetails";

// Define the type for params
interface OrderPageProps {
  params: Promise<{ orderId: string }>;
}

// This is a Next.js page component
const OrderPage: React.FC<OrderPageProps> = async ({ params }) => {
  const { orderId } = await params; // Await the params Promise to get the object

  return (
    <DefaultLayout>
      <OrderDetails orderId={orderId} />
    </DefaultLayout>
  );
};

export default OrderPage;