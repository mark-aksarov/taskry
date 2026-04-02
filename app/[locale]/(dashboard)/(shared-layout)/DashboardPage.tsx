import {
  CreateTaskModalTriggerLarge,
  CreateTaskModalTriggerMobile,
} from "@/components/tasks/CreateTaskModalTrigger";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { DashboardCardsGrid } from "@/components/common/DashboardCardsGrid";
import { AssignedTasksSection } from "@/components/tasks/AssignedTasksSection";
import { AssignedTasksEmptySection } from "@/components/tasks/AssignedTasksEmptySection";

interface DashboardPageProps {
  totalTaskCount: React.ReactNode;
  totalProjectsCardContainer: React.ReactNode;
  totalTasksCardContainer: React.ReactNode;
  totalUsersCardContainer: React.ReactNode;
  totalCustomersCardContainer: React.ReactNode;
  tasksContainer: React.ReactNode;
}

export function DashboardPage({
  totalTaskCount,
  totalProjectsCardContainer,
  totalTasksCardContainer,
  totalUsersCardContainer,
  totalCustomersCardContainer,
  tasksContainer,
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

        <AssignedTasksSection
          createTaskButton={
            totalTaskCount ? (
              <>
                <CreateTaskModalTriggerLarge className="max-md:hidden" />
                <CreateTaskModalTriggerMobile className="md:hidden" />
              </>
            ) : undefined
          }
          tasksContainer={
            totalTaskCount ? tasksContainer : <AssignedTasksEmptySection />
          }
        />
      </PageGrid>
    </PageContainer>
  );
}
