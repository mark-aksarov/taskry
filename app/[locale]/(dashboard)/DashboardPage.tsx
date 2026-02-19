import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { AppHeader } from "@/components/layout/AppHeader";
import { PageContainer } from "@/components/common/PageContainer";

interface DashboardPageProps {
  totalProjectsCardContainer: React.ReactNode;
  totalTasksCardContainer: React.ReactNode;
  totalUsersCardContainer: React.ReactNode;
  totalCustomersCardContainer: React.ReactNode;
  assignedTasksContainer: React.ReactNode;
  searchModal: React.ReactNode;
}

export function DashboardPage({
  totalProjectsCardContainer,
  totalTasksCardContainer,
  totalUsersCardContainer,
  totalCustomersCardContainer,
  assignedTasksContainer,
  searchModal,
}: DashboardPageProps) {
  const t = useTranslations("app.DashboardPage");

  return (
    <>
      <AppHeader heading={t("heading")} searchModal={searchModal} />
      <main>
        <PageContainer>
          <PageGrid>
            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>
            <div
              data-test="dashboard-cards"
              className="grid max-md:grid-cols-1 max-md:gap-4 md:gap-6 md:max-xl:grid-cols-2 xl:grid-cols-4"
            >
              {totalProjectsCardContainer}
              {totalTasksCardContainer}
              {totalUsersCardContainer}
              {totalCustomersCardContainer}
            </div>

            {assignedTasksContainer}
          </PageGrid>
        </PageContainer>
      </main>
    </>
  );
}
