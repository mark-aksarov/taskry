import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/dashboard/common/Toolbar";

import {
  ClientFiltersModalTriggerLarge,
  ClientFiltersModalTriggerMobile,
} from "@/dashboard/client/ClientFiltersModalTrigger";

import {
  ClientManageMenuTriggerLarge,
  ClientManageMenuTriggerMobile,
} from "@/dashboard/client/ClientManageMenuTrigger";

import {
  ClientSortingMenuTriggerLarge,
  ClientSortingMenuTriggerMobile,
} from "@/dashboard/client/ClientSortingMenuTrigger";

import {
  CreateClientMenuTriggerLarge,
  CreateClientMenuTriggerMobile,
} from "@/dashboard/client/CreateClientMenuTrigger";

import { useTranslations } from "next-intl";
import { ClientFilters, ClientSortField } from "@/lib/types";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { EntityPagination } from "@/dashboard/common/EntityPagination";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { CreateClientModal } from "@/dashboard/client/CreateClientModal";
import { ClientSearchModal } from "@/dashboard/client/ClientSearchModal";
import { ClientFiltersModal } from "@/dashboard/client/ClientFiltersModal";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ClientResultsCount } from "@/dashboard/client/ClientResultsCount";
import { DeleteClientsModal } from "@/dashboard/client/DeleteClientsModal";
import { ImportClientsModal } from "@/dashboard/client/ImportClientsModal";
import { CreateCompanyModal } from "@/dashboard/company/CreateCompanyModal";
import { CreateClientProvider } from "@/dashboard/client/CreateClientContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { ClientFiltersProvider } from "@/dashboard/client/ClientFiltersContext";
import { DeleteClientsProvider } from "@/dashboard/client/DeleteClientsContext";
import { CreateCompanyProvider } from "@/dashboard/company/CreateCompanyContext";
import { ClientActionsMenuTrigger } from "@/dashboard/client/ClientActionsMenuTrigger";
import { ClientCompanyFiltersModal } from "@/dashboard/client/ClientCompanyFiltersModal";
import { ClientsFilteredEmptySection } from "@/dashboard/client/ClientsFilteredEmptySection";
import { ClientsEmptySectionCreateButton } from "@/dashboard/client/ClientsEmptySectionCreateButton";
import { ClientCompanyFiltersModalTrigger } from "@/dashboard/client/ClientCompanyFiltersModalTrigger";

interface ClientsPageProps {
  page: number;
  pageSize: number;
  totalCount: number;
  companyCount: number;
  totalFilteredClients: number;
  selectedSortField: ClientSortField;
  filters: ClientFilters;
  selectedItems: SelectedItem[];
  clientGrid: React.ReactNode;
  createClientFormContainer: React.ReactNode;
  searchContainer: React.ReactNode;
  clientFiltersFormContainer: React.ReactNode;
  clientCompanyFiltersFormContainer: React.ReactNode;
}

export function ClientsPage({
  page,
  pageSize,
  totalCount,
  companyCount,
  totalFilteredClients,
  selectedSortField,
  filters,
  selectedItems,
  clientGrid,
  createClientFormContainer,
  searchContainer,
  clientFiltersFormContainer,
  clientCompanyFiltersFormContainer,
}: ClientsPageProps) {
  const t = useTranslations("app.ClientsPage");

  const isEmpty = totalCount === 0;
  const isFilteredEmpty = !isEmpty && totalFilteredClients === 0;

  return (
    <SelectedItemsProvider pageItems={selectedItems}>
      <ClientFiltersProvider filters={filters}>
        <CreateClientProvider>
          <CreateCompanyProvider>
            <DeleteClientsProvider>
              <DashboardContainer
                fullscreen={isEmpty || isFilteredEmpty}
                headerOffset
              >
                <DashboardGrid className="relative flex-auto">
                  {isEmpty ? (
                    <>
                      <ToolbarLarge
                        firstSlot={<ClientManageMenuTriggerLarge />}
                      />

                      <ToolbarMobile
                        firstSlot={
                          <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                        }
                        secondSlot={<ClientManageMenuTriggerMobile />}
                      />

                      <PageEmptySection
                        heading={t("emptySection.heading")}
                        description={t("emptySection.description")}
                        createButton={<ClientsEmptySectionCreateButton />}
                      />
                    </>
                  ) : (
                    <ViewModeProvider>
                      <ToolbarLarge
                        firstSlot={
                          <>
                            <ClientManageMenuTriggerLarge />
                            <ClientSortingMenuTriggerLarge
                              selectedSortField={selectedSortField}
                            />
                            <ClientFiltersModalTriggerLarge />
                            <ClientActionsMenuTrigger />
                          </>
                        }
                        secondSlot={
                          <>
                            <ViewModeToggleButtonGroup />
                            <CreateClientMenuTriggerLarge />
                          </>
                        }
                        twoRowsOnLg
                      />

                      <ToolbarMobile
                        firstSlot={
                          <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                        }
                        secondSlot={
                          <>
                            <CreateClientMenuTriggerMobile />
                            <ClientManageMenuTriggerMobile />
                          </>
                        }
                      />

                      <ToolbarSearchMobile>
                        <SearchModalTrigger />
                      </ToolbarSearchMobile>

                      <ToolbarFiltersMobile>
                        <ClientFiltersModalTriggerMobile />
                        {companyCount > 0 && (
                          <ClientCompanyFiltersModalTrigger />
                        )}
                      </ToolbarFiltersMobile>

                      {!isFilteredEmpty && (
                        <ToolbarMobile
                          firstSlot={
                            <ClientResultsCount count={totalFilteredClients} />
                          }
                          secondSlot={
                            <ClientSortingMenuTriggerMobile
                              selectedSortField={selectedSortField}
                            />
                          }
                        />
                      )}

                      {isFilteredEmpty ? (
                        <ClientsFilteredEmptySection />
                      ) : (
                        <>
                          {clientGrid}

                          <EntityPagination
                            page={page}
                            pageSize={pageSize}
                            totalPages={Math.ceil(
                              totalFilteredClients / pageSize,
                            )}
                          />
                        </>
                      )}
                    </ViewModeProvider>
                  )}
                </DashboardGrid>
              </DashboardContainer>

              <CreateClientModal
                createClientFormContainer={createClientFormContainer}
              />

              <ClientSearchModal searchContainer={searchContainer} />
              <ClientFiltersModal
                filtersFormContainer={clientFiltersFormContainer}
              />
              <ClientCompanyFiltersModal
                filtersFormContainer={clientCompanyFiltersFormContainer}
              />
              <CreateCompanyModal />
              <DeleteClientsModal />
              <ImportClientsModal />
            </DeleteClientsProvider>
          </CreateCompanyProvider>
        </CreateClientProvider>
      </ClientFiltersProvider>
    </SelectedItemsProvider>
  );
}
