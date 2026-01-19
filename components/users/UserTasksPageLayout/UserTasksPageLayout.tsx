import {
  UserCard,
  UserCardLeft,
  UserCardRight,
  UserCardTitle,
  UserCardHeader,
} from "@/components/users/UserCard";

import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { NewTaskModalTrigger } from "@/components/tasks/NewTaskModalTrigger";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";

interface UserTasksPageLayoutProps {
  userTasksContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
  newTaskFormContainer: React.ReactNode;
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
  deleteTasksAction: ActionFn<ActionState, DeleteTasksPayload>;
  updateTasksStatusesAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export function UserTasksPageLayout({
  userTasksContainer,
  userHeaderContainer,
  newTaskFormContainer,
  navigationDesktop,
  navigationMobile,
  deleteTasksAction,
  updateTasksStatusesAction,
}: UserTasksPageLayoutProps) {
  const t = useTranslations("users.UserTasksPageLayout");

  return (
    <SelectionProvider>
      <PageContainer className="max-md:hidden">
        <UserCard>
          <UserCardLeft>
            <UserCardHeader>
              <UserCardTitle>{t("title")}</UserCardTitle>
              <div className="flex gap-4">
                <TaskToolbarSortingMenuTrigger />
                <TaskToolbarActionsMenuTrigger
                  deleteAction={deleteTasksAction}
                  updateStatusAction={updateTasksStatusesAction}
                />
                <NewTaskModalTrigger newTaskForm={newTaskFormContainer} />
              </div>
            </UserCardHeader>
            {userTasksContainer}
          </UserCardLeft>

          <UserCardRight>
            {userHeaderContainer}
            {navigationDesktop}
          </UserCardRight>
        </UserCard>
      </PageContainer>

      <PageContainer className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("title")}</ToolbarMobileHeading>
            <TaskToolbarSortingMenuTrigger />
            <TaskToolbarActionsMenuTrigger
              deleteAction={deleteTasksAction}
              updateStatusAction={updateTasksStatusesAction}
            />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            {navigationMobile}
            <NewTaskModalTrigger newTaskForm={newTaskFormContainer} />
          </ToolbarMobileBottom>
          {userTasksContainer}
        </PageGrid>
      </PageContainer>
    </SelectionProvider>
  );
}
