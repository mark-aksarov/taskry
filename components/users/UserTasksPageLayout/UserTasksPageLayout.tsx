import {
  DetailCard,
  DetailCardLeft,
  DetailCardRight,
  DetailCardTitle,
  DetailCardHeader,
} from "@/components/common/DetailCard";

import {
  CreateTaskModalTriggerLarge,
  CreateTaskModalTriggerMobile,
} from "@/components/tasks/CreateTaskModalTrigger";

import { useTranslations } from "next-intl";
import { TaskSortField } from "@/lib/types";
import { EditUserModal } from "../EditUserModal";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { UserTasksPageEmptyLayout } from "./UserTasksPageEmptyLayout";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { TaskActionsMenuTrigger } from "@/components/tasks/TaskActionsMenuTrigger";
import { TaskSortingMenuTriggerLarge } from "@/components/tasks/TaskSortingMenuTrigger";
import { TaskSortingMenuTriggerMobile } from "@/components/tasks/TaskSortingMenuTrigger";

interface UserTasksPageLayoutProps {
  totalTasksCount: number;
  userId: string;
  selectedSortField: TaskSortField;
  backButton?: boolean;
  searchContainer: React.ReactNode;
  navigationLarge: React.ReactNode;
  navigationMobile: React.ReactNode;
  userTasksContainer: React.ReactNode;
  editUserFormContainer: React.ReactNode;
  newTaskFormContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function UserTasksPageLayout({
  totalTasksCount,
  userId,
  selectedSortField,
  backButton,
  searchContainer,
  navigationLarge,
  navigationMobile,
  userTasksContainer,
  editUserFormContainer,
  newTaskFormContainer,
  userDetailHeaderContainer,
}: UserTasksPageLayoutProps) {
  const t = useTranslations("users.UserTasksPageLayout");

  if (totalTasksCount === 0) {
    return (
      <>
        <UserTasksPageEmptyLayout
          userDetailHeaderContainer={userDetailHeaderContainer}
          navigationLarge={navigationLarge}
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
                <CreateTaskModalTriggerLarge />
                <TaskSortingMenuTriggerLarge
                  showLabel={false}
                  selectedSortField={selectedSortField}
                />
                <TaskActionsMenuTrigger showLabel={false} />
              </div>
            </DetailCardHeader>
            {userTasksContainer}
          </DetailCardLeft>

          <DetailCardRight>
            {userDetailHeaderContainer}
            {navigationLarge}
          </DetailCardRight>
        </DetailCard>
      </PageContainer>

      <PageContainer className="md:hidden">
        <PageGrid>
          <ToolbarMobile
            firstSlot={
              <>
                {backButton && <BackButton href="/team" />}
                <PageHeadingMobile>{t("title")}</PageHeadingMobile>
              </>
            }
            secondSlot={<CreateTaskModalTriggerMobile />}
          />
          <ToolbarMobile
            firstSlot={navigationMobile}
            secondSlot={
              <TaskSortingMenuTriggerMobile
                selectedSortField={selectedSortField}
              />
            }
          />

          {userTasksContainer}
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
      <ChangePasswordModal userId={userId} />
      <NewTaskModal newTaskFormContainer={newTaskFormContainer} />
      <EditUserModal editUserFormContainer={editUserFormContainer} />
    </>
  );
}
