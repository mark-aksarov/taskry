import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { TotalProjectsCardSkeleton } from "@/components/projects/TotalProjectsCard";
import { TotalTasksCardSkeleton } from "@/components/tasks/TotalTasksCard";
import { TotalCustomersCardSkeleton } from "@/components/customer/TotalCustomersCard";
import { TotalUsersCardSkeleton } from "@/components/users/TotalUsersCard";
import { TaskList } from "@/components/tasks/TaskList";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItemSkeleton } from "@/components/tasks/TaskListItem";
import {
  AssignedTasksSection,
  AssignedTasksSectionHeading,
} from "@/components/tasks/AssignedTasks";

interface DashboardPageProps {
  TotalProjectsCardContainer: React.ComponentType;
  TotalTasksCardContainer: React.ComponentType;
  TotalUsersCardContainer: React.ComponentType;
  TotalCustomersCardContainer: React.ComponentType;
  AssignedTasksContainer: React.ComponentType;
}

export function DashboardPage({
  TotalProjectsCardContainer,
  TotalTasksCardContainer,
  TotalUsersCardContainer,
  TotalCustomersCardContainer,
  AssignedTasksContainer,
}: DashboardPageProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Dashboard</ToolbarMobileHeading>
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
          <AssignedTasksContainer />
        </Suspense>
      </PageGrid>
    </PageContainer>
  );
}
