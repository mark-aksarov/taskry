import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

interface TeamProfileTasksPageProps {
  userId: string;
  page: number;
  pageSize: number;
  UserTasksContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    userId: string;
    baseUrl: string;
  }>;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
  NewTaskFormContainer: React.ComponentType;
  deleteTasksAction: ActionFn<ActionState, DeleteTasksPayload>;
}

export function TeamProfileTasksPage({
  userId,
  page,
  pageSize,
  UserTasksContainer,
  UserHeaderContainer,
  NewTaskFormContainer,
  deleteTasksAction,
}: TeamProfileTasksPageProps) {
  return (
    <UserTasksPageLayout
      userId={userId}
      page={page}
      pageSize={pageSize}
      baseUrl={`/team/${userId}/tasks`}
      UserTasksContainer={UserTasksContainer}
      UserHeaderContainer={UserHeaderContainer}
      NewTaskFormContainer={NewTaskFormContainer}
      navigationDesktop={<UserNavigationDesktop />}
      navigationMobile={<UserNavigationMobile />}
      deleteTasksAction={deleteTasksAction}
    />
  );
}
