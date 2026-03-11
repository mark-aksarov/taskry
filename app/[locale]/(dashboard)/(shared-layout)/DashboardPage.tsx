import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { DashboardCardsGrid } from "@/components/common/DashboardCardsGrid";

interface DashboardPageProps {
  totalProjectsCardContainer: React.ReactNode;
  totalTasksCardContainer: React.ReactNode;
  totalUsersCardContainer: React.ReactNode;
  totalCustomersCardContainer: React.ReactNode;
  assignedTasksContainer: React.ReactNode;
}

export function DashboardPage({
  totalProjectsCardContainer,
  totalTasksCardContainer,
  totalUsersCardContainer,
  totalCustomersCardContainer,
  assignedTasksContainer,
}: DashboardPageProps) {
  const t = useTranslations("app.DashboardPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <DashboardCardsGrid>
          {totalProjectsCardContainer}
          {totalTasksCardContainer}
          {totalUsersCardContainer}
          {totalCustomersCardContainer}
        </DashboardCardsGrid>

        {assignedTasksContainer}
      </PageGrid>
    </PageContainer>
  );
}
