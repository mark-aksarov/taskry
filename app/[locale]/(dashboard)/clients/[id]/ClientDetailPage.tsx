import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { ClientDTO } from "@/lib/data/client/client.dto";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { ClientDetailCard } from "@/dashboard/client/ClientDetailCard";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { UpdateClientBioModal } from "@/dashboard/client/UpdateClientBioModal";
import { DeleteClientProvider } from "@/dashboard/client/DeleteClientContext";
import { UpdateClientImageModal } from "@/dashboard/client/UpdateClientImageModal";
import { UpdateClientEmailModal } from "@/dashboard/client/UpdateClientEmailModal";
import { UpdateClientBioProvider } from "@/dashboard/client/UpdateClientBioContext";
import { DeleteClientDetailModal } from "@/dashboard/client/DeleteClientDetailModal";
import { UpdateClientCompanyModal } from "@/dashboard/client/UpdateClientCompanyModal";
import { UpdateClientEmailProvider } from "@/dashboard/client/UpdateClientEmailContext";
import { UpdateClientImageProvider } from "@/dashboard/client/UpdateClientImageContext";
import { UpdateClientFullNameModal } from "@/dashboard/client/UpdateClientFullNameModal";
import { UpdateClientCompanyProvider } from "@/dashboard/client/UpdateClientCompanyContext";
import { UpdateClientPublicLinkModal } from "@/dashboard/client/UpdateClientPublicLinkModal";
import { UpdateClientFullNameProvider } from "@/dashboard/client/UpdateClientFullNameContext";
import { UpdateClientPhoneNumberModal } from "@/dashboard/client/UpdateClientPhoneNumberModal";
import { UpdateClientImageFileProvider } from "@/dashboard/client/UpdateClientImageFileContext";
import { UpdateClientPublicLinkProvider } from "@/dashboard/client/UpdateClientPublicLinkContext";
import { UpdateClientPhoneNumberProvider } from "@/dashboard/client/UpdateClientPhoneNumberContext";

interface ClientDetailPageProps {
  client: ClientDTO;
  clientDetailContainer: React.ReactNode;
  clientDetailHeaderContainer: React.ReactNode;
  clientDetailActions: React.ReactNode;
  updateClientCompanyFormContainer: React.ReactNode;
  searchContainer: React.ReactNode;
}

export function ClientDetailPage({
  client,
  clientDetailContainer,
  clientDetailHeaderContainer,
  clientDetailActions,
  updateClientCompanyFormContainer,
  searchContainer,
}: ClientDetailPageProps) {
  const t = useTranslations("app.ClientDetailPage");

  return (
    <UpdateClientImageFileProvider>
      <UpdateClientImageProvider>
        <DeleteClientProvider>
          <UpdateClientBioProvider>
            <UpdateClientFullNameProvider>
              <UpdateClientPhoneNumberProvider>
                <UpdateClientPublicLinkProvider>
                  <UpdateClientEmailProvider>
                    <UpdateClientCompanyProvider>
                      <DashboardContainer>
                        <ClientDetailCard
                          clientDetailContainer={clientDetailContainer}
                          clientDetailHeaderContainer={
                            clientDetailHeaderContainer
                          }
                          clientDetailActions={clientDetailActions}
                        />

                        <DashboardGrid className="md:hidden">
                          <ToolbarMobile
                            firstSlot={
                              <>
                                <BackButton fallbackHref="/clients" />
                                <PageHeadingMobile>
                                  {t("heading")}
                                </PageHeadingMobile>
                              </>
                            }
                          />

                          <div className="flex flex-col">
                            {clientDetailHeaderContainer}
                          </div>
                          <Card className="flex flex-col p-1.5">
                            {clientDetailActions}
                          </Card>
                          <Card className="flex flex-col">
                            {clientDetailContainer}
                          </Card>
                        </DashboardGrid>
                      </DashboardContainer>

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
                          updateClientCompanyFormContainer
                        }
                      />

                      <DeleteClientDetailModal
                        clientId={client.id}
                        clientFullName={client.fullName}
                      />

                      <UpdateClientImageModal clientId={client.id} />

                      <TaskSearchModal searchContainer={searchContainer} />
                    </UpdateClientCompanyProvider>
                  </UpdateClientEmailProvider>
                </UpdateClientPublicLinkProvider>
              </UpdateClientPhoneNumberProvider>
            </UpdateClientFullNameProvider>
          </UpdateClientBioProvider>
        </DeleteClientProvider>
      </UpdateClientImageProvider>
    </UpdateClientImageFileProvider>
  );
}
