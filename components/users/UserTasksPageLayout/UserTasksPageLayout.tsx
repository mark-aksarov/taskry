import {
  DetailCard,
  DetailCardLeft,
  DetailCardRight,
  DetailCardTitle,
  DetailCardHeader,
} from "@/components/common/DetailCard";

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
import { TaskSortField } from "@/lib/types";
import { EditUserModal } from "../EditUserModal";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { PageContainer } from "@/components/common/PageContainer";
import { UserTasksPageEmptyLayout } from "./UserTasksPageEmptyLayout";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";

interface UserTasksPageLayoutProps {
  totalTasksCount: number;
  userId: string;
  selectedSortField: TaskSortField;
  backButton?: boolean;
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
  userTasksContainer: React.ReactNode;
  editUserFormContainer: React.ReactNode;
  newTaskFormContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
  deleteTasks: ActionFn<ActionState, DeleteTasksPayload>;
  updateTaskStatuses: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export function UserTasksPageLayout({
  totalTasksCount,
  userId,
  selectedSortField,
  backButton,
  navigationDesktop,
  navigationMobile,
  userTasksContainer,
  editUserFormContainer,
  newTaskFormContainer,
  userHeaderContainer,
  deleteTasks,
  updateTaskStatuses,
}: UserTasksPageLayoutProps) {
  const t = useTranslations("users.UserTasksPageLayout");

  const taskToolbarActionsMenuTrigger = (
    <TaskToolbarActionsMenuTrigger
      deleteTasks={deleteTasks}
      updateTaskStatuses={updateTaskStatuses}
    />
  );

  if (totalTasksCount === 0) {
    return (
      <UserTasksPageEmptyLayout
        newTaskFormContainer={newTaskFormContainer}
        userHeaderContainer={userHeaderContainer}
        navigationDesktop={navigationDesktop}
        navigationMobile={navigationMobile}
      />
    );
  }

  return (
    <>
      <PageContainer className="max-md:hidden">
        <DetailCard>
          <DetailCardLeft>
            <DetailCardHeader>
              <DetailCardTitle>{t("title")}</DetailCardTitle>
              <div className="flex gap-4">
                <TaskToolbarSortingMenuTrigger
                  selectedSortField={selectedSortField}
                />
                {taskToolbarActionsMenuTrigger}
              </div>
            </DetailCardHeader>
            {userTasksContainer}
          </DetailCardLeft>

          <DetailCardRight>
            {userHeaderContainer}
            {navigationDesktop}
          </DetailCardRight>
        </DetailCard>
      </PageContainer>

      <PageContainer className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            {backButton && <BackButton href="/team" />}
            <ToolbarMobileHeading>{t("title")}</ToolbarMobileHeading>
            <TaskToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {taskToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>{navigationMobile}</ToolbarMobileBottom>
          {userTasksContainer}
        </PageGrid>
      </PageContainer>

      <ChangePasswordModal userId={userId} />
      <EditUserModal editUserFormContainer={editUserFormContainer} />
    </>
  );
}
