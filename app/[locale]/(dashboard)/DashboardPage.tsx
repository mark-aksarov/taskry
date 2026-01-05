import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  AssignedTasksSection,
  AssignedTasksSectionHeading,
} from "@/components/tasks/AssignedTasks";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Repeat } from "@/components/common/Repeat";
import { TaskList } from "@/components/tasks/TaskList";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskListItemSkeleton } from "@/components/tasks/TaskListItem";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { TotalTasksCardSkeleton } from "@/components/tasks/TotalTasksCard";
import { TotalUsersCardSkeleton } from "@/components/users/TotalUsersCard";
import { TotalProjectsCardSkeleton } from "@/components/projects/TotalProjectsCard";
import { TotalCustomersCardSkeleton } from "@/components/customer/TotalCustomersCard";

interface DashboardPageProps {
  page: number;
  pageSize: number;
  NewTaskFormContainer: React.ComponentType;
  TotalProjectsCardContainer: React.ComponentType;
  TotalTasksCardContainer: React.ComponentType;
  TotalUsersCardContainer: React.ComponentType;
  TotalCustomersCardContainer: React.ComponentType;
  AssignedTasksContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    NewTaskFormContainer: React.ComponentType;
  }>;
}

export function DashboardPage({
  page,
  pageSize,
  NewTaskFormContainer,
  TotalProjectsCardContainer,
  TotalTasksCardContainer,
  TotalUsersCardContainer,
  TotalCustomersCardContainer,
  AssignedTasksContainer,
}: DashboardPageProps) {
  const t = useTranslations("app.DashboardPage");

  return (
    <PageContainer>
      <PageGrid>
        <SelectionProvider>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
          </ToolbarMobileTop>
          <div className="grid max-md:grid-cols-1 max-md:gap-4 md:gap-6 md:max-xl:grid-cols-2 xl:grid-cols-4">
            <Suspense fallback={<TotalProjectsCardSkeleton />}>
              <TotalProjectsCardContainer />
            </Suspense>

            <Suspense fallback={<TotalTasksCardSkeleton />}>
              <TotalTasksCardContainer />
            </Suspense>

            <Suspense fallback={<TotalUsersCardSkeleton />}>
              <TotalUsersCardContainer />
            </Suspense>

            <Suspense fallback={<TotalCustomersCardSkeleton />}>
              <TotalCustomersCardContainer />
            </Suspense>
          </div>

          <Suspense
            fallback={
              <AssignedTasksSection>
                <AssignedTasksSectionHeading />
                <TaskList>
                  <Repeat
                    items={10}
                    renderItem={() => <TaskListItemSkeleton />}
                  />
                </TaskList>
              </AssignedTasksSection>
            }
          >
            <AssignedTasksContainer
              page={page}
              pageSize={pageSize}
              NewTaskFormContainer={NewTaskFormContainer}
            />
          </Suspense>
        </SelectionProvider>
      </PageGrid>
    </PageContainer>
  );
}
