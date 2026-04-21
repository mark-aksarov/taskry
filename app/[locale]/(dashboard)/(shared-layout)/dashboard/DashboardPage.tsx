import {
  CreateTaskModalTriggerLarge,
  CreateTaskModalTriggerMobile,
} from "@/dashboard/tasks/CreateTaskModalTrigger";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardCardsGrid } from "@/dashboard/common/DashboardCardsGrid";
import { AssignedTasksSection } from "@/dashboard/tasks/AssignedTasksSection";
import { AssignedTasksEmptySection } from "@/dashboard/tasks/AssignedTasksEmptySection";

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
        <ViewModeProvider>
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
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
