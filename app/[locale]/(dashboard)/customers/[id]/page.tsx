import { CustomerDetailPage } from "./CustomerDetailPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CustomerHeaderContainer } from "@/components/customer/CustomerHeaderContainer";
import { CustomerDetailAltContainer } from "@/components/customer/CustomerDetailAltContainer";

export default async function AppCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id } = await params;

  return (
    <CustomerDetailPage
      customerDetailContainer={
        <CustomerDetailAltContainer customerId={Number(id)} />
      }
      customerHeaderContainer={
        <CustomerHeaderContainer customerId={Number(id)} />
      }
    />
  );
}
