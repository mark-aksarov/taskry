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

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { NewTaskModalTrigger } from "@/components/tasks/NewTaskModalTrigger";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";

interface UserTasksPageLayoutProps {
  userId: string;
  page: number;
  pageSize: number;
  sort: string;
  baseUrl: string;
  UserTasksContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    sort: string;
    userId: string;
    baseUrl: string;
  }>;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
  NewTaskFormContainer: React.ComponentType;
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
  deleteTasksAction: ActionFn<ActionState, DeleteTasksPayload>;
  updateTasksStatusesAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export function UserTasksPageLayout({
  userId,
  page,
  pageSize,
  sort,
  baseUrl,
  UserTasksContainer,
  UserHeaderContainer,
  NewTaskFormContainer,
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
                <NewTaskModalTrigger
                  newTaskForm={
                    <Suspense fallback={<TaskFormBaseSkeleton />}>
                      <NewTaskFormContainer />
                    </Suspense>
                  }
                />
              </div>
            </UserCardHeader>
            <UserTasksContainer
              userId={userId}
              page={page}
              pageSize={pageSize}
              sort={sort}
              baseUrl={baseUrl}
            />
          </UserCardLeft>

          <UserCardRight>
            <UserHeaderContainer userId={userId} />
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
            <NewTaskModalTrigger newTaskForm={<NewTaskFormContainer />} />
          </ToolbarMobileBottom>

          <UserTasksContainer
            userId={userId}
            page={page}
            pageSize={pageSize}
            sort={sort}
            baseUrl={baseUrl}
          />
        </PageGrid>
      </PageContainer>
    </SelectionProvider>
  );
}
