import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
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
        <ToolbarMobile
          firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
        />
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
