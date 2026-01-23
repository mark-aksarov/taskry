import { z } from "zod";
import { Suspense } from "react";
import { DashboardPage } from "./DashboardPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { AssignedTasksSkeleton } from "@/components/tasks/AssignedTasks";
import { TotalTasksCardSkeleton } from "@/components/tasks/TotalTasksCard";
import { TotalUsersCardSkeleton } from "@/components/users/TotalUsersCard";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasksContainer";
import { TotalProjectsCardSkeleton } from "@/components/projects/TotalProjectsCard";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCardContainer";
import { TotalCustomersCardSkeleton } from "@/components/customer/TotalCustomersCard";
import { TotalProjectsCardContainer } from "@/components/projects/TotalProjectsCardContainer";
import { TotalCustomersCardContainer } from "@/components/customer/TotalCustomersCardContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
});

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
        <Suspense fallback={<AssignedTasksSkeleton />}>
          <AssignedTasksContainer
            page={page}
            pageSize={pageSize}
            newTaskFormContainer={<NewTaskFormContainer />}
          />
        </Suspense>
      }
    />
  );
}
