import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

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

export function TeamProfileTasksPage({
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
      baseUrl={`/team/${userId}/tasks`}
      UserTasksContainer={UserTasksContainer}
      UserHeaderContainer={UserHeaderContainer}
      NewTaskFormContainer={NewTaskFormContainer}
      navigationDesktop={<UserNavigationDesktop />}
      navigationMobile={<UserNavigationMobile />}
      deleteTasksAction={deleteTasksAction}
      updateTasksStatusesAction={updateTasksStatusesAction}
    />
  );
}
