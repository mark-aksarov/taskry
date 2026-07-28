import { z } from "zod";
import { notFound } from "next/navigation";
import { taskSortFields } from "@/lib/types";
import { getTaskList } from "@/lib/data/task/task.dal";
import { getUserSummary } from "@/lib/data/user/user.dal";
import { TeamProfileTasksPage } from "./TeamProfileTasksPage";
import { ProfileActions } from "@/dashboard/users/ProfileActions";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { canEditUserProfile } from "@/lib/utils/canEditUserProfile";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { UserNavigationLarge } from "@/dashboard/users/UserNavigationLarge";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { UserNavigationMobile } from "@/dashboard/users/UserNavigationMobile";
import { UserTaskListContainer } from "@/dashboard/users/UserTaskListContainer";
import { CreateTaskFormContainer } from "@/dashboard/tasks/CreateTaskFormContainer";
import { UpdateUserFormContainer } from "@/dashboard/users/UpdateUserFormContainer";
import { UserDetailHeaderAltContainer } from "@/dashboard/users/UserDetailHeaderAltContainer";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  sort: z.enum(taskSortFields).catch("createdAt"),
});

export default async function AppProfileTasksPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; pageSize?: string; sort?: string }>;
}) {
  // Authorization
  const session = await requireFullAccess();

  // Validation
  const { id: userId } = await params;
  const rawParams = await searchParams;
  const { page, pageSize, sort } = searchParamsSchema.parse(rawParams);

  // Get user summary
  const userSummary = await getUserSummary(userId);

  if (!userSummary) {
    notFound();
  }

  // Get tasks for specific user
  const { items: tasks, totalCount: totalTasksCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters: {
      assigneeIds: [userId],
    },
  });

  const showUserActions = await canEditUserProfile({
    session,
    profileUserId: userId,
  });

  return (
    <TeamProfileTasksPage
      user={userSummary}
      page={page}
      pageSize={pageSize}
      totalTasksCount={totalTasksCount}
      selectedSortField={sort}
      backButton
      selectedItems={tasks.map((t) => ({ id: t.id, status: t.status }))}
      navigationLarge={
        <UserNavigationLarge
          userActions={showUserActions && <ProfileActions userId={userId} />}
        />
      }
      navigationMobile={<UserNavigationMobile />}
      userTaskList={<UserTaskListContainer tasks={tasks} />}
      userDetailHeaderContainer={
        <UserDetailHeaderAltContainer userId={userId} />
      }
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
      createTaskFormContainer={
        <CreateTaskFormContainer forcedAssigneeId={userId} />
      }
      updateUserFormContainer={<UpdateUserFormContainer userId={userId} />}
    />
  );
}
