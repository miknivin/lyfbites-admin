import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrderDetails from "@/components/SessionSOrderDetails";

// Define the type for params
interface OrderPageProps {
  params: Promise<{ orderId: string }>;
}

const SessionStarted: React.FC<OrderPageProps> = async ({ params }) => {
  const { orderId } = await params; // Await the params Promise to get the object
  // console.log(orderId, "orderId");

  return (
    <DefaultLayout>
      <OrderDetails orderId={orderId} />
    </DefaultLayout>
  );
};

export default SessionStarted;