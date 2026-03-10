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
import { NewTaskModal } from "@/components/tasks/NewTaskModal";

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
}: UserTasksPageLayoutProps) {
  const t = useTranslations("users.UserTasksPageLayout");

  if (totalTasksCount === 0) {
    return (
      <>
        <UserTasksPageEmptyLayout
          userHeaderContainer={userHeaderContainer}
          navigationDesktop={navigationDesktop}
          navigationMobile={navigationMobile}
          backButton={backButton}
        />

        <ChangePasswordModal userId={userId} />
        <NewTaskModal newTaskFormContainer={newTaskFormContainer} />
        <EditUserModal editUserFormContainer={editUserFormContainer} />
      </>
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
                <TaskToolbarActionsMenuTrigger />
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
            <TaskToolbarActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>{navigationMobile}</ToolbarMobileBottom>
          {userTasksContainer}
        </PageGrid>
      </PageContainer>

      <ChangePasswordModal userId={userId} />
      <NewTaskModal newTaskFormContainer={newTaskFormContainer} />
      <EditUserModal editUserFormContainer={editUserFormContainer} />
    </>
  );
}
