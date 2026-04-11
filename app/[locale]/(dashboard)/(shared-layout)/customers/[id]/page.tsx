import { notFound } from "next/navigation";
import { customerId } from "@/lib/schemas/customer";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { getCustomerFormData } from "@/lib/data/customer/customer.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { CustomerDetailActions } from "@/components/customer/CustomerDetailActions";
import { UpdateCustomerBioModal } from "@/components/customer/UpdateCustomerBioModal";
import { DeleteCustomerProvider } from "@/components/customer/DeleteCustomerProvider";
import { UpdateCustomerImageModal } from "@/components/customer/UpdateCustomerImageModal";
import { DeleteCustomerImageModal } from "@/components/customer/DeleteCustomerImageModal";
import { UpdateCustomerBioProvider } from "@/components/customer/UpdateCustomerBioProvider";
import { DeleteCustomerDetailModal } from "@/components/customer/DeleteCustomerDetailModal";
import { CustomerDetailAltContainer } from "@/components/customer/CustomerDetailAltContainer";
import { UpdateCustomerImageProvider } from "@/components/customer/UpdateCustomerImageProvider";
import { UpdateCustomerFullNameModal } from "@/components/customer/UpdateCustomerFullNameModal";
import { ClearCustomerImageUrlProvider } from "@/components/customer/ClearCustomerImageUrlProvider";
import { UpdateCustomerFullNameProvider } from "@/components/customer/UpdateCustomerFullNameProvider";
import { UpdateCustomerImageFileProvider } from "@/components/customer/UpdateCustomerImageFileContext";
import { CustomerDetailHeaderAltContainer } from "@/components/customer/CustomerDetailHeaderAltContainer";
import { UpdateCustomerPhoneNumberProvider } from "@/components/customer/UpdateCustomerPhoneNumberProvider";
import { UpdateCustomerPhoneNumberModal } from "@/components/customer/UpdateCustomerPhoneNumberModal";

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
  const customerFormData = await getCustomerFormData(id);

  if (!customerFormData) {
    notFound();
  }

  return (
    <UpdateCustomerImageFileProvider>
      <UpdateCustomerImageProvider>
        <ClearCustomerImageUrlProvider>
          <DeleteCustomerProvider>
            <UpdateCustomerBioProvider>
              <UpdateCustomerFullNameProvider>
                <UpdateCustomerPhoneNumberProvider>
                  <CustomerDetailPage
                    customerDetailContainer={
                      <CustomerDetailAltContainer customerId={id} />
                    }
                    customerDetailHeaderContainer={
                      <CustomerDetailHeaderAltContainer customerId={id} />
                    }
                    customerDetailActions={<CustomerDetailActions />}
                  />

                  <UpdateCustomerBioModal
                    customerId={customerFormData.id}
                    customerBio={customerFormData.bio}
                  />

                  <UpdateCustomerFullNameModal
                    customerId={customerFormData.id}
                    customerFullName={customerFormData.fullName}
                  />

                  <UpdateCustomerPhoneNumberModal
                    customerId={customerFormData.id}
                    customerPhoneNumber={customerFormData.phoneNumber}
                  />

                  <DeleteCustomerDetailModal
                    customerId={customerFormData.id}
                    customerFullName={customerFormData.fullName}
                  />

                  <UpdateCustomerImageModal customerId={customerFormData.id} />

                  <DeleteCustomerImageModal
                    customerId={customerFormData.id}
                    customerFullName={customerFormData.fullName}
                  />

                  <TaskSearchModal
                    searchContainer={<LinkSearchContainer pathname="/tasks" />}
                  />
                </UpdateCustomerPhoneNumberProvider>
              </UpdateCustomerFullNameProvider>
            </UpdateCustomerBioProvider>
          </DeleteCustomerProvider>
        </ClearCustomerImageUrlProvider>
      </UpdateCustomerImageProvider>
    </UpdateCustomerImageFileProvider>
  );
}
