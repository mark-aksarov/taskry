import { notFound } from "next/navigation";
import { customerId } from "@/lib/schemas/customer";
import { CustomerDetailPage } from "./CustomerDetailPage";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { getCustomerFormData } from "@/lib/data/customer/customer.dal";
import { requireProtectedPageSession } from "@/lib/utils/requireProtectedPageSession";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { CustomerDetailActions } from "@/dashboard/customer/CustomerDetailActions";
import { UpdateCustomerBioModal } from "@/dashboard/customer/UpdateCustomerBioModal";
import { DeleteCustomerProvider } from "@/dashboard/customer/DeleteCustomerProvider";
import { UpdateCustomerImageModal } from "@/dashboard/customer/UpdateCustomerImageModal";
import { UpdateCustomerEmailModal } from "@/dashboard/customer/UpdateCustomerEmailModal";
import { DeleteCustomerImageModal } from "@/dashboard/customer/DeleteCustomerImageModal";
import { UpdateCustomerBioProvider } from "@/dashboard/customer/UpdateCustomerBioProvider";
import { DeleteCustomerDetailModal } from "@/dashboard/customer/DeleteCustomerDetailModal";
import { CustomerDetailAltContainer } from "@/dashboard/customer/CustomerDetailAltContainer";
import { UpdateCustomerCompanyModal } from "@/dashboard/customer/UpdateCustomerCompanyModal";
import { UpdateCustomerEmailProvider } from "@/dashboard/customer/UpdateCustomerEmailProvider";
import { UpdateCustomerImageProvider } from "@/dashboard/customer/UpdateCustomerImageProvider";
import { UpdateCustomerFullNameModal } from "@/dashboard/customer/UpdateCustomerFullNameModal";
import { UpdateCustomerCompanyProvider } from "@/dashboard/customer/UpdateCustomerCompanyProvider";
import { UpdateCustomerPublicLinkModal } from "@/dashboard/customer/UpdateCustomerPublicLinkModal";
import { ClearCustomerImageUrlProvider } from "@/dashboard/customer/ClearCustomerImageUrlProvider";
import { UpdateCustomerFullNameProvider } from "@/dashboard/customer/UpdateCustomerFullNameProvider";
import { UpdateCustomerPhoneNumberModal } from "@/dashboard/customer/UpdateCustomerPhoneNumberModal";
import { UpdateCustomerImageFileProvider } from "@/dashboard/customer/UpdateCustomerImageFileContext";
import { CustomerDetailHeaderAltContainer } from "@/dashboard/customer/CustomerDetailHeaderAltContainer";
import { UpdateCustomerPublicLinkProvider } from "@/dashboard/customer/UpdateCustomerPublicLinkProvider";
import { UpdateCustomerPhoneNumberProvider } from "@/dashboard/customer/UpdateCustomerPhoneNumberProvider";
import { UpdateCustomerCompanyFormContainer } from "@/dashboard/customer/UpdateCustomerCompanyFormContainer";

export default async function AppCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPageSession();

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
