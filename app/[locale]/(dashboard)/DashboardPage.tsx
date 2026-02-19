import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  AppHeader,
  AppHeaderContainerProps,
} from "@/components/layout/AppHeader";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";

interface DashboardPageProps {
  totalProjectsCardContainer: React.ReactNode;
  totalTasksCardContainer: React.ReactNode;
  totalUsersCardContainer: React.ReactNode;
  totalCustomersCardContainer: React.ReactNode;
  assignedTasksContainer: React.ReactNode;
  appHeaderProps: AppHeaderContainerProps;
}

export function DashboardPage({
  totalProjectsCardContainer,
  totalTasksCardContainer,
  totalUsersCardContainer,
  totalCustomersCardContainer,
  assignedTasksContainer,
  appHeaderProps,
}: DashboardPageProps) {
  const t = useTranslations("app.DashboardPage");

  return (
    <>
      <AppHeader {...appHeaderProps} heading={t("heading")} />
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
