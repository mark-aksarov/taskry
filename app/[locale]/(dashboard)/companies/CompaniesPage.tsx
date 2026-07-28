import {
  CreateCompanyModalTriggerLarge,
  CreateCompanyModalTriggerMobile,
} from "@/dashboard/company/CreateCompanyModalTrigger";

import {
  CompanyManageMenuTriggerLarge,
  CompanyManageMenuTriggerMobile,
} from "@/dashboard/company/CompanyManageMenuTrigger";

import { useTranslations } from "next-intl";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { CreateCompanyModal } from "@/dashboard/company/CreateCompanyModal";
import { ImportCompaniesModal } from "@/dashboard/company/ImportCompaniesModal";
import { DeleteCompaniesModal } from "@/dashboard/company/DeleteCompaniesModal";
import { CreateCompanyProvider } from "@/dashboard/company/CreateCompanyContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { DeleteCompaniesProvider } from "@/dashboard/company/DeleteCompaniesContext";
import { CompanyActionsMenuTrigger } from "@/dashboard/company/CompanyActionsMenuTrigger";
import { CompaniesEmptySectionCreateButton } from "@/dashboard/company/CompaniesEmptySectionCreateButton";

interface CompaniesPageProps {
  totalCount: number;
  selectedItems: SelectedItem[];
  companiesContainer: React.ReactNode;
  searchContainer?: React.ReactNode;
}

export function CompaniesPage({
  totalCount,
  selectedItems,
  companiesContainer,
  searchContainer,
}: CompaniesPageProps) {
  const t = useTranslations("app.CompaniesPage");

  const isEmpty = totalCount === 0;

  return (
    <SelectedItemsProvider pageItems={selectedItems}>
      <DeleteCompaniesProvider>
        <CreateCompanyProvider>
          <DashboardContainer fullscreen={isEmpty} headerOffset={isEmpty}>
            <DashboardGrid
              className={isEmpty ? "relative flex-auto" : undefined}
            >
              {isEmpty ? (
                <>
                  <ToolbarLarge firstSlot={<CompanyManageMenuTriggerLarge />} />

                  <ToolbarMobile
                    firstSlot={
                      <>
                        <BackButton fallbackHref="/clients" />
                        <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                      </>
                    }
                  />

                  <PageEmptySection
                    heading={t("emptySection.heading")}
                    description={t("emptySection.description")}
                    createButton={<CompaniesEmptySectionCreateButton />}
                  />
                </>
              ) : (
                <>
                  <ViewModeProvider>
                    <ToolbarLarge
                      firstSlot={
                        <>
                          <CompanyManageMenuTriggerLarge />
                          <CompanyActionsMenuTrigger />
                        </>
                      }
                      secondSlot={<CreateCompanyModalTriggerLarge />}
                    />

                    <ToolbarMobile
                      firstSlot={
                        <>
                          <BackButton fallbackHref="/clients" />
                          <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                        </>
                      }
                      secondSlot={
                        <>
                          <CompanyManageMenuTriggerMobile />
                          <CreateCompanyModalTriggerMobile />
                        </>
                      }
                    />

                    {companiesContainer}
                  </ViewModeProvider>
                </>
              )}
            </DashboardGrid>
          </DashboardContainer>

          <TaskSearchModal searchContainer={searchContainer} />
          <CreateCompanyModal />
          <DeleteCompaniesModal />
          <ImportCompaniesModal />
        </CreateCompanyProvider>
      </DeleteCompaniesProvider>
    </SelectedItemsProvider>
  );
}
