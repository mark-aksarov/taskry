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
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { AssignedTasksEmptySection } from "@/dashboard/tasks/TasksEmptySection";
import { TaskActionsMenuTrigger } from "@/dashboard/tasks/TaskActionsMenuTrigger";
import { TaskSortingMenuTriggerLarge } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { TaskSortingMenuTriggerMobile } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { EntityPagination } from "@/dashboard/common/EntityPagination";

interface TeamProfileTasksPageProps {
  page: number;
  pageSize: number;
  totalTasksCount: number;
  selectedSortField: TaskSortField;
  backButton?: boolean;
  navigationLarge: React.ReactNode;
  navigationMobile: React.ReactNode;
  userTaskList: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function TeamProfileTasksPage({
  page,
  pageSize,
  totalTasksCount,
  selectedSortField,
  backButton,
  navigationLarge,
  navigationMobile,
  userTaskList,
  userDetailHeaderContainer,
}: TeamProfileTasksPageProps) {
  const t = useTranslations("app.TeamProfileTaskPage");

  const totalPages = Math.ceil(totalTasksCount / pageSize);

  const paginationProps = {
    page,
    totalPages,
    pageSize,
  };

  const pagination = (
    <>
      <EntityPagination {...paginationProps} className="md:hidden" />
      <EntityPagination
        {...paginationProps}
        buttonVariant="primary"
        className="py-4 max-md:hidden"
      />
    </>
  );

  if (totalTasksCount === 0) {
    return (
      <>
        <DashboardContainer className="max-md:hidden">
          <DetailCard>
            <DetailCardLeft>
              <DetailCardHeader>
                <DetailCardTitle>{t("heading")}</DetailCardTitle>
              </DetailCardHeader>

              <div className="flex flex-auto items-center justify-center px-6">
                <AssignedTasksEmptySection headingClassName="md:text-3xl" />
              </div>
            </DetailCardLeft>

            <DetailCardRight>
              {userDetailHeaderContainer}
              {navigationLarge}
            </DetailCardRight>
          </DetailCard>
        </DashboardContainer>

        <DashboardContainer fullscreen headerOffset className="md:hidden">
          <DashboardGrid className="relative flex-auto">
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
              <AssignedTasksEmptySection />
            </AbsoluteCenter>
          </DashboardGrid>
        </DashboardContainer>
      </>
    );
  }

  return (
    <ViewModeProvider>
      <DashboardContainer className="max-md:hidden">
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
            {
              <>
                {userTaskList}
                {pagination}
              </>
            }
          </DetailCardLeft>

          <DetailCardRight>
            {userDetailHeaderContainer}
            {navigationLarge}
          </DetailCardRight>
        </DetailCard>
      </DashboardContainer>

      <DashboardContainer className="md:hidden">
        <DashboardGrid>
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
          {
            <>
              {userTaskList}
              {pagination}
            </>
          }
        </DashboardGrid>
      </DashboardContainer>
    </ViewModeProvider>
  );
}
