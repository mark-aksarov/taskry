import { notFound } from "next/navigation";
import { customerId } from "@/lib/schemas/customer";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
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
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { UpdateCustomerTransitionProvider } from "@/components/customer/UpdateCustomerTransitionContext";

export default async function AppCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireProtectedPage();

  // Parse and validate
  const { id: rawCustomerId } = await params;

  const parsed = customerId.safeParse(rawCustomerId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get customer summary
  const customerSummary = await getCustomerSummary(id);

  if (!customerSummary) {
    notFound();
  }

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <CustomerDetailPage
        customerDetailContainer={<CustomerDetailAltContainer customerId={id} />}
        customerHeaderContainer={<CustomerHeaderContainer customerId={id} />}
        customerDetailActions={
          <UpdateCustomerTransitionProvider>
            <CustomerDetailActions
              customerId={id}
              customerFullName={customerSummary.fullName}
              deleteCustomer={deleteCustomers}
              editCustomerFormContainer={
                <EditCustomerFormContainer customerId={id} />
              }
            />
          </UpdateCustomerTransitionProvider>
        }
        appHeaderProps={defaultAppHeaderSlots}
      />
    </CurrentUserProvider>
  );
}
