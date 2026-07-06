import {
  CreateTaskModalTriggerLarge,
  CreateTaskModalTriggerMobile,
} from "@/dashboard/tasks/CreateTaskModalTrigger";

import { useTranslations } from "next-intl";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { DashboardCardsGrid } from "@/dashboard/common/DashboardCardsGrid";
import { AssignedTasksSection } from "@/dashboard/tasks/AssignedTasksSection";
import { AssignedTasksEmptySection } from "@/dashboard/tasks/TasksEmptySection";

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
    <DashboardContainer>
      <DashboardGrid>
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
              totalTaskCount ? (
                tasksContainer
              ) : (
                <div className="flex h-[25rem] items-center justify-center">
                  <AssignedTasksEmptySection headingClassName="max-md:text-3xl md:text-4xl" />
                </div>
              )
            }
          />
        </ViewModeProvider>
      </DashboardGrid>
    </DashboardContainer>
  );
}
