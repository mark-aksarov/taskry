import { notFound } from "next/navigation";
import { customerId } from "@/lib/schemas/customer";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { getCustomerSummary } from "@/lib/data/customer/customer.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { UpdateCustomerModal } from "@/components/customer/UpdateCustomerModal";
import { CustomerDetailActions } from "@/components/customer/CustomerDetailActions";
import { DeleteCustomerProvider } from "@/components/customer/DeleteCustomerProvider";
import { UpdateCustomerProvider } from "@/components/customer/UpdateCustomerProvider";
import { UpdateCustomerImageModal } from "@/components/customer/UpdateCustomerImageModal";
import { DeleteCustomerImageModal } from "@/components/customer/DeleteCustomerImageModal";
import { DeleteCustomerDetailModal } from "@/components/customer/DeleteCustomerDetailModal";
import { CustomerDetailAltContainer } from "@/components/customer/CustomerDetailAltContainer";
import { UpdateCustomerFormContainer } from "@/components/customer/UpdateCustomerFormContainer";
import { UpdateCustomerImageProvider } from "@/components/customer/UpdateCustomerImageProvider";
import { ClearCustomerImageUrlProvider } from "@/components/customer/ClearCustomerImageUrlProvider";
import { UpdateCustomerImageFileProvider } from "@/components/customer/UpdateCustomerImageFileContext";
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
    <UpdateCustomerImageFileProvider>
      <UpdateCustomerImageProvider>
        <ClearCustomerImageUrlProvider>
          <DeleteCustomerProvider>
            <UpdateCustomerProvider customerId={customerSummary.id}>
              <CustomerDetailPage
                customerDetailContainer={
                  <CustomerDetailAltContainer customerId={id} />
                }
                customerDetailHeaderContainer={
                  <CustomerDetailHeaderAltContainer customerId={id} />
                }
                customerDetailActions={<CustomerDetailActions />}
              />

              <UpdateCustomerModal
                updateCustomerFormContainer={
                  <UpdateCustomerFormContainer
                    customerId={customerSummary.id}
                  />
                }
              />

              <DeleteCustomerDetailModal
                customerId={customerSummary.id}
                customerFullName={customerSummary.fullName}
              />

              <UpdateCustomerImageModal customerId={customerSummary.id} />

              <DeleteCustomerImageModal
                customerId={customerSummary.id}
                customerFullName={customerSummary.fullName}
              />

              <TaskSearchModal
                searchContainer={<LinkSearchContainer pathname="/tasks" />}
              />
            </UpdateCustomerProvider>
          </DeleteCustomerProvider>
        </ClearCustomerImageUrlProvider>
      </UpdateCustomerImageProvider>
    </UpdateCustomerImageFileProvider>
  );
}
