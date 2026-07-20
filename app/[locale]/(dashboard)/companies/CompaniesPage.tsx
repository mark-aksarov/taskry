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
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { CompanyActionsMenuTrigger } from "@/dashboard/company/CompanyActionsMenuTrigger";
import { CompaniesEmptySectionCreateButton } from "@/dashboard/company/CompaniesEmptySectionCreateButton";

interface CompaniesPageProps {
  totalCount: number;
  companiesContainer: React.ReactNode;
}

export function CompaniesPage({
  totalCount,
  companiesContainer,
}: CompaniesPageProps) {
  const t = useTranslations("app.CompaniesPage");

  if (totalCount === 0) {
    return (
      <DashboardContainer fullscreen headerOffset>
        <DashboardGrid className="relative flex-auto">
          <ToolbarLarge firstSlot={<CompanyManageMenuTriggerLarge />} />

          <ToolbarMobile
            firstSlot={
              <>
                <BackButton fallbackHref="/customers" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
            secondSlot={<CompanyManageMenuTriggerMobile />}
          />

          <PageEmptySection
            heading={t("emptySection.heading")}
            description={t("emptySection.description")}
            createButton={<CompaniesEmptySectionCreateButton />}
          />
        </DashboardGrid>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardGrid>
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
                <BackButton fallbackHref="/customers" />
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
      </DashboardGrid>
    </DashboardContainer>
  );
}
