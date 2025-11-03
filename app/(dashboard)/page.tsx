import { Suspense } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import {
  TotalProjectsCard,
  TotalProjectsCardSkeleton,
} from "@/components/dashboard/TotalProjectsCard";
import {
  TotalTasksCard,
  TotalTasksCardSkeleton,
} from "@/components/dashboard/TotalTasksCard";
import {
  TotalCustomersCard,
  TotalCustomersCardSkeleton,
} from "@/components/dashboard/TotalCustomersCard";
import {
  TotalUsersCard,
  TotalUsersCardSkeleton,
} from "@/components/dashboard/TotalUsersCard";
import { TaskListItem } from "@/components/tasks/TaskListItem";
import { AssignedTasks } from "@/components/tasks/AssignedTasks";
import { AssignedTasksSection } from "@/components/tasks/AssignedTasks/AssignedTasksSection";
import { AssignedTasksSectionHeading } from "@/components/tasks/AssignedTasks/AssignedTasksSectionHeading";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Dashboard</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <div className="grid max-md:grid-cols-1 max-md:gap-4 md:gap-6 md:max-xl:grid-cols-2 xl:grid-cols-4">
          <Suspense fallback={<TotalProjectsCardSkeleton />}>
            <TotalProjectsCard />
          </Suspense>

          <Suspense fallback={<TotalTasksCardSkeleton />}>
            <TotalTasksCard />
          </Suspense>

          <Suspense fallback={<TotalCustomersCardSkeleton />}>
            <TotalCustomersCard />
          </Suspense>

          <Suspense fallback={<TotalUsersCardSkeleton />}>
            <TotalUsersCard />
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
