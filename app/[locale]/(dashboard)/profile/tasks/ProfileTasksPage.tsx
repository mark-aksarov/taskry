import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

interface TeamProfileTasksPageProps {
  userId: string;
  page: number;
  pageSize: number;
  sort: string;
  UserTasksContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    sort: string;
    userId: string;
    baseUrl: string;
  }>;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
  NewTaskFormContainer: React.ComponentType;
  deleteTasksAction: ActionFn<ActionState, DeleteTasksPayload>;
  updateTasksStatusesAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export function ProfileTasksPage({
  userId,
  page,
  pageSize,
  sort,
  UserTasksContainer,
  UserHeaderContainer,
  NewTaskFormContainer,
  deleteTasksAction,
  updateTasksStatusesAction,
}: TeamProfileTasksPageProps) {
  return (
    <UserTasksPageLayout
      userId={userId}
      page={page}
      pageSize={pageSize}
      sort={sort}
      baseUrl="/profile/tasks"
      UserTasksContainer={UserTasksContainer}
      UserHeaderContainer={UserHeaderContainer}
      NewTaskFormContainer={NewTaskFormContainer}
      navigationDesktop={<ProfileNavigationDesktop />}
      navigationMobile={<ProfileNavigationMobile />}
      deleteTasksAction={deleteTasksAction}
      updateTasksStatusesAction={updateTasksStatusesAction}
    />
  );
}
