import {
  DetailCard,
  DetailCardLeft,
  DetailCardRight,
  DetailCardTitle,
  DetailCardHeader,
} from "@/dashboard/common/DetailCard";

import {
  CreateTaskModalTriggerLarge,
  CreateTaskModalTriggerMobile,
} from "@/dashboard/tasks/CreateTaskModalTrigger";

import { useTranslations } from "next-intl";
import { TaskSortField } from "@/lib/types";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { UserTasksPageEmptyLayout } from "./UserTasksPageEmptyLayout";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { TaskActionsMenuTrigger } from "@/dashboard/tasks/TaskActionsMenuTrigger";
import { TaskSortingMenuTriggerLarge } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { TaskSortingMenuTriggerMobile } from "@/dashboard/tasks/TaskSortingMenuTrigger";

interface UserTasksPageLayoutProps {
  totalTasksCount: number;
  selectedSortField: TaskSortField;
  backButton?: boolean;
  navigationLarge: React.ReactNode;
  navigationMobile: React.ReactNode;
  userTasksContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function UserTasksPageLayout({
  totalTasksCount,
  selectedSortField,
  backButton,
  navigationLarge,
  navigationMobile,
  userTasksContainer,
  userDetailHeaderContainer,
}: UserTasksPageLayoutProps) {
  const t = useTranslations("dashboard.users.UserTasksPageLayout");

  if (totalTasksCount === 0) {
    return (
      <UserTasksPageEmptyLayout
        userDetailHeaderContainer={userDetailHeaderContainer}
        navigationLarge={navigationLarge}
        navigationMobile={navigationMobile}
        backButton={backButton}
      />
    );
  }

  return (
    <ViewModeProvider>
      <PageContainer className="max-md:hidden">
        <DetailCard>
          <DetailCardLeft>
            <DetailCardHeader>
              <DetailCardTitle>{t("title")}</DetailCardTitle>
              <div className="flex gap-4">
                <CreateTaskModalTriggerLarge />
                <TaskSortingMenuTriggerLarge
                  showLabel={false}
                  buttonVariant="primary"
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
                {backButton && <BackButton fallbackHref="/team" />}
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
    </ViewModeProvider>
  );
}
