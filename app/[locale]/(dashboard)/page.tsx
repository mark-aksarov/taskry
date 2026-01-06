import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import {
  AssignedTasksSection,
  AssignedTasksSectionHeading,
} from "@/components/tasks/AssignedTasks";

import { z } from "zod";
import { Suspense } from "react";
import { DashboardPage } from "./DashboardPage";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItemSkeleton } from "@/components/tasks/TaskListItem";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TotalTasksCardSkeleton } from "@/components/tasks/TotalTasksCard";
import { TotalUsersCardSkeleton } from "@/components/users/TotalUsersCard";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasksContainer";
import { TotalProjectsCardSkeleton } from "@/components/projects/TotalProjectsCard";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCardContainer";
import { TotalCustomersCardSkeleton } from "@/components/customer/TotalCustomersCard";
import { TaskDetailCompactContainer } from "@/components/tasks/TaskDetailCompactContainer";
import { TotalProjectsCardContainer } from "@/components/projects/TotalProjectsCardContainer";
import { TotalCustomersCardContainer } from "@/components/customer/TotalCustomersCardContainer";
import { ProjectDetailCompactContainer } from "@/components/projects/ProjectDetailCompactContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
});

const context: GlobalContainerContextType = {
  EditTaskFormContainer,
  TaskDetailCompactContainer,
  TaskCommentsContainer,
  ProjectDetailCompactContainer,
  UserDetailContainer,
};

export default async function AppDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize } = searchParamsSchema.parse(rawParams);

  return (
    <GlobalContainerProvider value={context}>
      <DashboardPage
        totalProjectsCardContainer={
          <Suspense fallback={<TotalProjectsCardSkeleton />}>
            <TotalProjectsCardContainer />
          </Suspense>
        }
        totalTasksCardContainer={
          <Suspense fallback={<TotalTasksCardSkeleton />}>
            <TotalTasksCardContainer />
          </Suspense>
        }
        totalUsersCardContainer={
          <Suspense fallback={<TotalUsersCardSkeleton />}>
            <TotalUsersCardContainer />
          </Suspense>
        }
        totalCustomersCardContainer={
          <Suspense fallback={<TotalCustomersCardSkeleton />}>
            <TotalCustomersCardContainer />
          </Suspense>
        }
        assignedTasksContainer={
          <Suspense
            fallback={
              <AssignedTasksSection>
                <AssignedTasksSectionHeading />
                <List>
                  <Repeat
                    items={10}
                    renderItem={() => <TaskListItemSkeleton />}
                  />
                </List>
              </AssignedTasksSection>
            }
          >
            <AssignedTasksContainer
              page={page}
              pageSize={pageSize}
              newTaskFormContainer={<NewTaskFormContainer />}
            />
          </Suspense>
        }
      />
    </GlobalContainerProvider>
  );
}
