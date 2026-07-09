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
import { EntityPagination } from "@/dashboard/common/EntityPagination";

interface DashboardPageProps {
  taskPage: number;
  taskPageSize: number;
  totalTaskCount: number;
  totalProjectsCardContainer: React.ReactNode;
  totalTasksCardContainer: React.ReactNode;
  totalUsersCardContainer: React.ReactNode;
  totalCustomersCardContainer: React.ReactNode;
  taskGrid: React.ReactNode;
}

export function DashboardPage({
  taskPage,
  taskPageSize,
  totalTaskCount,
  totalProjectsCardContainer,
  totalTasksCardContainer,
  totalUsersCardContainer,
  totalCustomersCardContainer,
  taskGrid,
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
            taskGrid={
              totalTaskCount ? (
                <>
                  <>{taskGrid}</>
                  <EntityPagination
                    page={taskPage}
                    pageSize={taskPageSize}
                    totalPages={Math.ceil(totalTaskCount / taskPageSize)}
                  />
                </>
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
