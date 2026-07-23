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
import { ClientSortField } from "@/lib/types";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ClientResultsCount } from "@/dashboard/client/ClientResultsCount";
import { EntityPagination } from "@/dashboard/common/EntityPagination";
import { ClientActionsMenuTrigger } from "@/dashboard/client/ClientActionsMenuTrigger";
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
  clientGrid: React.ReactNode;
}

export function ClientsPage({
  page,
  pageSize,
  totalCount,
  companyCount,
  totalFilteredClients,
  selectedSortField,
  clientGrid,
}: ClientsPageProps) {
  const t = useTranslations("app.ClientsPage");

  if (totalCount === 0) {
    return (
      <DashboardContainer fullscreen headerOffset>
        <DashboardGrid className="relative flex-auto">
          <ToolbarLarge firstSlot={<ClientManageMenuTriggerLarge />} />

          <ToolbarMobile
            firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
            secondSlot={<ClientManageMenuTriggerMobile />}
          />

          <PageEmptySection
            heading={t("emptySection.heading")}
            description={t("emptySection.description")}
            createButton={<ClientsEmptySectionCreateButton />}
          />
        </DashboardGrid>
      </DashboardContainer>
    );
  }

  const isFilteredEmpty = totalFilteredClients === 0;

  return (
    <DashboardContainer fullscreen={isFilteredEmpty} headerOffset>
      <DashboardGrid className="relative flex-auto">
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
            firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
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
            {companyCount > 0 && <ClientCompanyFiltersModalTrigger />}
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
              <>{clientGrid}</>
              <EntityPagination
                page={page}
                pageSize={pageSize}
                totalPages={Math.ceil(totalFilteredClients / pageSize)}
              />
            </>
          )}
        </ViewModeProvider>
      </DashboardGrid>
    </DashboardContainer>
  );
}
