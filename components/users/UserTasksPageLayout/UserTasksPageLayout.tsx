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
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";

interface UserTasksPageLayoutProps {
  userTasksContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
  selectedSortField: TaskSortField;
  backButton?: boolean;
  deleteTasks: ActionFn<ActionState, DeleteTasksPayload>;
  updateTaskStatuses: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export function UserTasksPageLayout({
  userTasksContainer,
  userHeaderContainer,
  navigationDesktop,
  navigationMobile,
  selectedSortField,
  backButton,
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
    </>
  );
}
