import {
  CreateCompanyModalTriggerLarge,
  CreateCompanyModalTriggerMobile,
} from "@/components/company/CreateCompanyModalTrigger";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { NewCompanyModal } from "@/components/company/NewCompanyModal";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/components/common/Toolbar";
import { CompanyActionsMenuTrigger } from "@/components/company/CompanyActionsMenuTrigger";
import { CompaniesEmptySectionCreateButton } from "@/components/company/CompaniesEmptySectionCreateButton";

interface CompaniesPageProps {
  totalCount: number;
  searchContainer: React.ReactNode;
  companiesContainer: React.ReactNode;
}

export function CompaniesPage({
  totalCount,
  searchContainer,
  companiesContainer,
}: CompaniesPageProps) {
  const t = useTranslations("app.CompaniesPage");

  if (totalCount === 0) {
    return (
      <>
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarMobile
              firstSlot={
                <>
                  <BackButton href="/customers" />
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

        <NewCompanyModal />
      </>
    );
  }

  return (
    <>
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
                  <BackButton href="/customers" />
                  <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                </>
              }
              secondSlot={<CreateCompanyModalTriggerMobile />}
            />
            {companiesContainer}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
      <NewCompanyModal />
    </>
  );
}
