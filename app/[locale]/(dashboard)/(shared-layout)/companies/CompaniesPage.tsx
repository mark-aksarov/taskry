import {
  CreateCompanyModalTriggerLarge,
  CreateCompanyModalTriggerMobile,
} from "@/dashboard/company/CreateCompanyModalTrigger";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
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
      <PageContainer fullscreen headerOffset>
        <PageGrid className="relative flex-auto">
          <ToolbarMobile
            firstSlot={
              <>
                <BackButton fallbackHref="/customers" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
          />

          <PageEmptySection
            heading={t("emptySection.heading")}
            description={t("emptySection.description")}
            createButton={<CompaniesEmptySectionCreateButton />}
          />
        </PageGrid>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarLarge
            firstSlot={<CompanyActionsMenuTrigger />}
            secondSlot={<CreateCompanyModalTriggerLarge />}
          />

          <ToolbarMobile
            firstSlot={
              <>
                <BackButton fallbackHref="/customers" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
            secondSlot={<CreateCompanyModalTriggerMobile />}
          />
          {companiesContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
