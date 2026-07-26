import { notFound } from "next/navigation";
import { clientId } from "@/lib/schemas/client";
import { ClientDetailPage } from "./ClientDetailPage";
import { getClient } from "@/lib/data/client/client.dal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { ClientDetailActions } from "@/dashboard/client/ClientDetailActions";
import { UpdateClientBioModal } from "@/dashboard/client/UpdateClientBioModal";
import { DeleteClientProvider } from "@/dashboard/client/DeleteClientProvider";
import { UpdateClientImageModal } from "@/dashboard/client/UpdateClientImageModal";
import { UpdateClientEmailModal } from "@/dashboard/client/UpdateClientEmailModal";
import { DeleteClientImageModal } from "@/dashboard/client/DeleteClientImageModal";
import { UpdateClientBioProvider } from "@/dashboard/client/UpdateClientBioProvider";
import { DeleteClientDetailModal } from "@/dashboard/client/DeleteClientDetailModal";
import { verifyProtectedPageSession } from "@/lib/utils/verifyProtectedPageSession";
import { ClientDetailAltContainer } from "@/dashboard/client/ClientDetailAltContainer";
import { UpdateClientCompanyModal } from "@/dashboard/client/UpdateClientCompanyModal";
import { UpdateClientEmailProvider } from "@/dashboard/client/UpdateClientEmailProvider";
import { UpdateClientImageProvider } from "@/dashboard/client/UpdateClientImageProvider";
import { UpdateClientFullNameModal } from "@/dashboard/client/UpdateClientFullNameModal";
import { UpdateClientCompanyProvider } from "@/dashboard/client/UpdateClientCompanyProvider";
import { UpdateClientPublicLinkModal } from "@/dashboard/client/UpdateClientPublicLinkModal";
import { ClearClientImageUrlProvider } from "@/dashboard/client/ClearClientImageUrlProvider";
import { UpdateClientFullNameProvider } from "@/dashboard/client/UpdateClientFullNameProvider";
import { UpdateClientPhoneNumberModal } from "@/dashboard/client/UpdateClientPhoneNumberModal";
import { UpdateClientImageFileProvider } from "@/dashboard/client/UpdateClientImageFileContext";
import { ClientDetailHeaderAltContainer } from "@/dashboard/client/ClientDetailHeaderAltContainer";
import { UpdateClientPublicLinkProvider } from "@/dashboard/client/UpdateClientPublicLinkProvider";
import { UpdateClientPhoneNumberProvider } from "@/dashboard/client/UpdateClientPhoneNumberProvider";
import { UpdateClientCompanyFormContainer } from "@/dashboard/client/UpdateClientCompanyFormContainer";

export default async function AppClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await verifyProtectedPageSession();

  // Parse and validate
  const { id: rawClientId } = await params;

  const parsed = clientId.safeParse(rawClientId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get client data
  const client = await getClient(id);

  if (!client) {
    notFound();
  }

  return (
    <UpdateClientImageFileProvider>
      <UpdateClientImageProvider>
        <ClearClientImageUrlProvider>
          <DeleteClientProvider>
            <UpdateClientBioProvider>
              <UpdateClientFullNameProvider>
                <UpdateClientPhoneNumberProvider>
                  <UpdateClientPublicLinkProvider>
                    <UpdateClientEmailProvider>
                      <UpdateClientCompanyProvider>
                        <ClientDetailPage
                          clientDetailContainer={
                            <ClientDetailAltContainer clientId={id} />
                          }
                          clientDetailHeaderContainer={
                            <ClientDetailHeaderAltContainer clientId={id} />
                          }
                          clientDetailActions={<ClientDetailActions />}
                        />

                        <UpdateClientBioModal
                          clientId={client.id}
                          clientBio={client.bio}
                        />

                        <UpdateClientFullNameModal
                          clientId={client.id}
                          clientFullName={client.fullName}
                        />

                        <UpdateClientPhoneNumberModal
                          clientId={client.id}
                          clientPhoneNumber={client.phoneNumber}
                        />

                        <UpdateClientPublicLinkModal
                          clientId={client.id}
                          clientPublicLink={client.publicLink}
                        />

                        <UpdateClientEmailModal
                          clientId={client.id}
                          clientEmail={client.email}
                        />

                        <UpdateClientCompanyModal
                          updateClientCompanyFormContainer={
                            <UpdateClientCompanyFormContainer
                              clientId={client.id}
                              companyId={client.companyId}
                            />
                          }
                        />

                        <DeleteClientDetailModal
                          clientId={client.id}
                          clientFullName={client.fullName}
                        />

                        <UpdateClientImageModal clientId={client.id} />

                        <DeleteClientImageModal
                          clientId={client.id}
                          clientFullName={client.fullName}
                        />

                        <TaskSearchModal
                          searchContainer={
                            <LinkSearchContainer pathname="/tasks" />
                          }
                        />
                      </UpdateClientCompanyProvider>
                    </UpdateClientEmailProvider>
                  </UpdateClientPublicLinkProvider>
                </UpdateClientPhoneNumberProvider>
              </UpdateClientFullNameProvider>
            </UpdateClientBioProvider>
          </DeleteClientProvider>
        </ClearClientImageUrlProvider>
      </UpdateClientImageProvider>
    </UpdateClientImageFileProvider>
  );
}
