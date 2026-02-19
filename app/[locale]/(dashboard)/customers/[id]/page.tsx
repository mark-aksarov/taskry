import { notFound } from "next/navigation";
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

  const { id } = await params;
  const numberId = Number(id);

  const customerSummary = await getCustomerSummary(numberId);

  if (!customerSummary) {
    notFound();
  }

  const guestMode = await hasGuestRole();

  return (
    <CustomerDetailPage
      customerDetailContainer={
        <CustomerDetailAltContainer customerId={numberId} />
      }
      customerHeaderContainer={
        <CustomerHeaderContainer customerId={numberId} />
      }
      customerDetailActions={
        <CustomerDetailActions
          guestMode={guestMode}
          customerId={numberId}
          customerFullName={customerSummary.fullName}
          deleteCustomer={deleteCustomers}
          editCustomerFormContainer={
            <EditCustomerFormContainer customerId={numberId} />
          }
        />
      }
      appHeaderProps={defaultAppHeaderSlots}
    />
  );
}
