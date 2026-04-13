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
import { UpdateCustomerEmailModal } from "@/components/customer/UpdateCustomerEmailModal";
import { DeleteCustomerImageModal } from "@/components/customer/DeleteCustomerImageModal";
import { UpdateCustomerBioProvider } from "@/components/customer/UpdateCustomerBioProvider";
import { DeleteCustomerDetailModal } from "@/components/customer/DeleteCustomerDetailModal";
import { CustomerDetailAltContainer } from "@/components/customer/CustomerDetailAltContainer";
import { UpdateCustomerCompanyModal } from "@/components/customer/UpdateCustomerCompanyModal";
import { UpdateCustomerEmailProvider } from "@/components/customer/UpdateCustomerEmailProvider";
import { UpdateCustomerImageProvider } from "@/components/customer/UpdateCustomerImageProvider";
import { UpdateCustomerFullNameModal } from "@/components/customer/UpdateCustomerFullNameModal";
import { UpdateCustomerCompanyProvider } from "@/components/customer/UpdateCustomerCompanyProvider";
import { UpdateCustomerPublicLinkModal } from "@/components/customer/UpdateCustomerPublicLinkModal";
import { ClearCustomerImageUrlProvider } from "@/components/customer/ClearCustomerImageUrlProvider";
import { UpdateCustomerFullNameProvider } from "@/components/customer/UpdateCustomerFullNameProvider";
import { UpdateCustomerPhoneNumberModal } from "@/components/customer/UpdateCustomerPhoneNumberModal";
import { UpdateCustomerImageFileProvider } from "@/components/customer/UpdateCustomerImageFileContext";
import { CustomerDetailHeaderAltContainer } from "@/components/customer/CustomerDetailHeaderAltContainer";
import { UpdateCustomerPublicLinkProvider } from "@/components/customer/UpdateCustomerPublicLinkProvider";
import { UpdateCustomerPhoneNumberProvider } from "@/components/customer/UpdateCustomerPhoneNumberProvider";
import { UpdateCustomerCompanyFormContainer } from "@/components/customer/UpdateCustomerCompanyFormContainer";

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
        <ClearCustomerImageUrlProvider customerId={id}>
          <DeleteCustomerProvider>
            <UpdateCustomerBioProvider>
              <UpdateCustomerFullNameProvider>
                <UpdateCustomerPhoneNumberProvider>
                  <UpdateCustomerPublicLinkProvider>
                    <UpdateCustomerEmailProvider>
                      <UpdateCustomerCompanyProvider>
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

                        <UpdateCustomerPublicLinkModal
                          customerId={customerFormData.id}
                          customerPublicLink={customerFormData.publicLink}
                        />

                        <UpdateCustomerEmailModal
                          customerId={customerFormData.id}
                          customerEmail={customerFormData.email}
                        />

                        <UpdateCustomerCompanyModal
                          updateCustomerCompanyFormContainer={
                            <UpdateCustomerCompanyFormContainer
                              customerId={customerFormData.id}
                              companyId={customerFormData.companyId}
                            />
                          }
                        />

                        <DeleteCustomerDetailModal
                          customerId={customerFormData.id}
                          customerFullName={customerFormData.fullName}
                        />

                        <UpdateCustomerImageModal
                          customerId={customerFormData.id}
                        />

                        <DeleteCustomerImageModal
                          customerId={customerFormData.id}
                          customerFullName={customerFormData.fullName}
                        />

                        <TaskSearchModal
                          searchContainer={
                            <LinkSearchContainer pathname="/tasks" />
                          }
                        />
                      </UpdateCustomerCompanyProvider>
                    </UpdateCustomerEmailProvider>
                  </UpdateCustomerPublicLinkProvider>
                </UpdateCustomerPhoneNumberProvider>
              </UpdateCustomerFullNameProvider>
            </UpdateCustomerBioProvider>
          </DeleteCustomerProvider>
        </ClearCustomerImageUrlProvider>
      </UpdateCustomerImageProvider>
    </UpdateCustomerImageFileProvider>
  );
}
