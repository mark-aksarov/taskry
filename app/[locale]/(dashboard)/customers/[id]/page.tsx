import { notFound } from "next/navigation";
import { customerId } from "@/lib/schemas/customer";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { getCustomerSummary } from "@/lib/data/customer/customer.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { CustomerDetailActions } from "@/components/customer/CustomerDetailActions";
import { CustomerHeaderContainer } from "@/components/customer/CustomerHeaderContainer";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";
import { EditCustomerFormContainer } from "@/components/customer/EditCustomerFormContainer";
import { CustomerDetailAltContainer } from "@/components/customer/CustomerDetailAltContainer";

export default async function AppCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id: rawCustomerId } = await params;

  const parsed = customerId.safeParse(rawCustomerId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  const customerSummary = await getCustomerSummary(id);

  if (!customerSummary) {
    notFound();
  }

  const guestMode = await hasGuestRole();

  return (
    <CustomerDetailPage
      customerDetailContainer={<CustomerDetailAltContainer customerId={id} />}
      customerHeaderContainer={<CustomerHeaderContainer customerId={id} />}
      customerDetailActions={
        <CustomerDetailActions
          guestMode={guestMode}
          customerId={id}
          customerFullName={customerSummary.fullName}
          deleteCustomer={deleteCustomers}
          editCustomerFormContainer={
            <EditCustomerFormContainer customerId={id} />
          }
        />
      }
      appHeaderProps={defaultAppHeaderSlots}
    />
  );
}
