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
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { UserTasksPageEmptyLayout } from "./UserTasksPageEmptyLayout";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { TaskActionsMenuTrigger } from "@/components/tasks/TaskActionsMenuTrigger";
import { TaskSortingMenuTriggerLarge } from "@/components/tasks/TaskSortingMenuTrigger";
import { TaskSortingMenuTriggerMobile } from "@/components/tasks/TaskSortingMenuTrigger";

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
  const t = useTranslations("users.UserTasksPageLayout");

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
    </>
  );
}
