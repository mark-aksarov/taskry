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
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";
import { TasksEmptySection } from "@/dashboard/tasks/TasksEmptySection";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { TaskActionsMenuTrigger } from "@/dashboard/tasks/TaskActionsMenuTrigger";
import { TaskSortingMenuTriggerLarge } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { TaskSortingMenuTriggerMobile } from "@/dashboard/tasks/TaskSortingMenuTrigger";

interface TeamProfileTasksPageProps {
  totalTasksCount: number;
  selectedSortField: TaskSortField;
  backButton?: boolean;
  navigationLarge: React.ReactNode;
  navigationMobile: React.ReactNode;
  userTasksContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function TeamProfileTasksPage({
  totalTasksCount,
  selectedSortField,
  backButton,
  navigationLarge,
  navigationMobile,
  userTasksContainer,
  userDetailHeaderContainer,
}: TeamProfileTasksPageProps) {
  const t = useTranslations("app.TeamProfileTaskPage");

  if (totalTasksCount === 0) {
    return (
      <>
        <PageContainer className="max-md:hidden">
          <DetailCard>
            <DetailCardLeft>
              <DetailCardHeader>
                <DetailCardTitle>{t("heading")}</DetailCardTitle>
              </DetailCardHeader>

              <div className="flex flex-auto items-center justify-center px-6">
                <TasksEmptySection headingClassName="md:text-3xl" />
              </div>
            </DetailCardLeft>

            <DetailCardRight>
              {userDetailHeaderContainer}
              {navigationLarge}
            </DetailCardRight>
          </DetailCard>
        </PageContainer>

        <PageContainer fullscreen headerOffset className="md:hidden">
          <PageGrid className="relative flex-auto">
            <ToolbarMobile
              firstSlot={
                <>
                  {backButton && <BackButton fallbackHref="/team" />}
                  <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                </>
              }
            />
            <ToolbarMobile firstSlot={navigationMobile} />

            <AbsoluteCenter className="w-full">
              <TasksEmptySection />
            </AbsoluteCenter>
          </PageGrid>
        </PageContainer>
      </>
    );
  }

  return (
    <ViewModeProvider>
      <PageContainer className="max-md:hidden">
        <DetailCard>
          <DetailCardLeft>
            <DetailCardHeader>
              <DetailCardTitle>{t("heading")}</DetailCardTitle>
              <div className="flex gap-4">
                <CreateTaskModalTriggerLarge />
                <TaskSortingMenuTriggerLarge
                  showLabel={false}
                  buttonVariant="primary"
                  selectedSortField={selectedSortField}
                />
                <TaskActionsMenuTrigger
                  showLabel={false}
                  buttonVariant="primary"
                />
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
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
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
