import { notFound } from "next/navigation";
import { customerId } from "@/lib/schemas/customer";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { getCustomerSummary } from "@/lib/data/customer/customer.dal";
import { deleteCustomer } from "@/lib/actions/customer/deleteCustomer";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { CustomerDetailActions } from "@/components/customer/CustomerDetailActions";
import { UpdateCustomerProvider } from "@/components/customer/UpdateCustomerContext";
import { DeleteCustomerProvider } from "@/components/customer/DeleteCustomerContext";
import { EditCustomerFormContainer } from "@/components/customer/EditCustomerFormContainer";
import { CustomerDetailAltContainer } from "@/components/customer/CustomerDetailAltContainer";
import { CustomerDetailHeaderAltContainer } from "@/components/customer/CustomerDetailHeaderAltContainer";

export default async function AppCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

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

  return (
    <CustomerDetailPage
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
      customerDetailContainer={<CustomerDetailAltContainer customerId={id} />}
      customerDetailHeaderContainer={
        <CustomerDetailHeaderAltContainer customerId={id} />
      }
      customerDetailActions={
        <UpdateCustomerProvider updateCustomer={updateCustomer}>
          <DeleteCustomerProvider deleteCustomer={deleteCustomer}>
            <CustomerDetailActions
              customerId={id}
              customerFullName={customerSummary.fullName}
              editCustomerFormContainer={
                <EditCustomerFormContainer customerId={id} />
              }
            />
          </DeleteCustomerProvider>
        </UpdateCustomerProvider>
      }
    />
  );
}
