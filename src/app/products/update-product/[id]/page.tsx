import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateProductStepper from "@/components/UpdateProductStepper";

interface PageProps {
  params: Promise<{ id: string }>; 
}

export default async function Page({ params }: PageProps) {
  const { id } = await params; 

  return (
    <DefaultLayout>
      <UpdateProductStepper productId={id} />
    </DefaultLayout>
  );
}
