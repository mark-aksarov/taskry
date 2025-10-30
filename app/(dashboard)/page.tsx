import { List } from "@/components/common/List";
import { PageContainer } from "@/components/common/PageContainer";
import { PageGrid } from "@/components/common/PageGrid";
import { Repeat } from "@/components/common/Repeat";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import {
  ActiveProjectsCard,
  ActiveProjectsCardSkeleton,
} from "@/components/dashboard/ActiveProjectsCard";
import {
  ActiveTasksCard,
  ActiveTasksCardSkeleton,
} from "@/components/dashboard/ActiveTasksCard";
import {
  StorageLimitCard,
  StorageLimitCardSkeleton,
} from "@/components/dashboard/StorageLimitCard";
import {
  TasksDoneCard,
  TasksDoneCardSkeleton,
} from "@/components/dashboard/TasksDoneCard";
import { AssignedTasks } from "@/components/tasks/AssignedTasks";
import { AssignedTasksSection } from "@/components/tasks/AssignedTasks/AssignedTasksSection";
import { AssignedTasksSectionHeading } from "@/components/tasks/AssignedTasks/AssignedTasksSectionHeading";
import { TaskListItem } from "@/components/tasks/TaskListItem";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Dashboard</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <div className="grid max-md:grid-cols-1 max-md:gap-4 md:gap-6 md:max-xl:grid-cols-2 xl:grid-cols-4">
          <Suspense fallback={<ActiveProjectsCardSkeleton />}>
            <ActiveProjectsCard />
          </Suspense>

          <Suspense fallback={<ActiveTasksCardSkeleton />}>
            <ActiveTasksCard />
          </Suspense>

          <Suspense fallback={<TasksDoneCardSkeleton />}>
            <TasksDoneCard />
          </Suspense>

          <Suspense fallback={<StorageLimitCardSkeleton />}>
            <StorageLimitCard />
          </Suspense>
        </div>

        <Suspense
          fallback={
            <AssignedTasksSection>
              <AssignedTasksSectionHeading />
              <List>
                <Repeat items={10} renderItem={() => <TaskListItem />} />
              </List>
            </AssignedTasksSection>
          }
        >
          <AssignedTasks />
        </Suspense>
      </PageGrid>
    </PageContainer>
  );
}
