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

import {
  SelectedTask,
  SelectedTasksProvider,
} from "@/dashboard/tasks/SelectedTasksContext";

import { useTranslations } from "next-intl";
import { TaskSortField } from "@/lib/types";
import { UserSummaryDTO } from "@/lib/data/user/user.dto";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";
import { CreateTaskModal } from "@/dashboard/tasks/CreateTaskModal";
import { UpdateUserModal } from "@/dashboard/users/UpdateUserModal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { DeleteTasksModal } from "@/dashboard/tasks/DeleteTasksModal";
import { EntityPagination } from "@/dashboard/common/EntityPagination";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DeleteUserProvider } from "@/dashboard/users/DeleteUserContext";
import { CreateTaskProvider } from "@/dashboard/tasks/CreateTaskContext";
import { UpdateUserProvider } from "@/dashboard/users/UpdateUserProvider";
import { DeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksContext";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ChangePasswordModal } from "@/dashboard/users/ChangePasswordModal";
import { UpdateUserImageModal } from "@/dashboard/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/dashboard/users/DeleteUserImageModal";
import { AssignedTasksEmptySection } from "@/dashboard/tasks/TasksEmptySection";
import { ChangePasswordProvider } from "@/dashboard/users/ChangePasswordContext";
import { TaskActionsMenuTrigger } from "@/dashboard/tasks/TaskActionsMenuTrigger";
import { UpdateUserImageProvider } from "@/dashboard/users/UpdateUserImageContext";
import { ClearUserImageUrlProvider } from "@/dashboard/users/ClearUserImageUrlContext";
import { TaskSortingMenuTriggerLarge } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { TaskSortingMenuTriggerMobile } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { UpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesContext";
import { UpdateUserImageFileProvider } from "@/dashboard/users/UpdateUserImageFileContext";

interface TeamProfileTasksPageProps {
  user: UserSummaryDTO;
  page: number;
  pageSize: number;
  totalTasksCount: number;
  selectedSortField: TaskSortField;
  backButton?: boolean;
  selectedItems: SelectedTask[];
  navigationLarge: React.ReactNode;
  navigationMobile: React.ReactNode;
  userTaskList: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
  searchContainer: React.ReactNode;
  createTaskFormContainer: React.ReactNode;
  updateUserFormContainer: React.ReactNode;
}

export function TeamProfileTasksPage({
  user,
  page,
  pageSize,
  totalTasksCount,
  selectedSortField,
  backButton,
  selectedItems,
  navigationLarge,
  navigationMobile,
  userTaskList,
  userDetailHeaderContainer,
  searchContainer,
  createTaskFormContainer,
  updateUserFormContainer,
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

  const isEmpty = totalTasksCount === 0;

  return (
    <UpdateUserImageFileProvider>
      <UpdateUserImageProvider>
        <ClearUserImageUrlProvider>
          <DeleteUserProvider>
            <UpdateUserProvider>
              <ChangePasswordProvider>
                <SelectedTasksProvider pageItems={selectedItems}>
                  <UpdateTaskStatusesProvider>
                    <DeleteTasksProvider>
                      <CreateTaskProvider>
                        <ViewModeProvider>
                          {isEmpty ? (
                            <>
                              <DashboardContainer className="max-md:hidden">
                                <DetailCard>
                                  <DetailCardLeft>
                                    <DetailCardHeader>
                                      <DetailCardTitle>
                                        {t("heading")}
                                      </DetailCardTitle>
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

                              <DashboardContainer
                                fullscreen
                                headerOffset
                                className="md:hidden"
                              >
                                <DashboardGrid className="relative flex-auto">
                                  <ToolbarMobile
                                    firstSlot={
                                      <>
                                        {backButton && (
                                          <BackButton fallbackHref="/team" />
                                        )}
                                        <PageHeadingMobile>
                                          {t("heading")}
                                        </PageHeadingMobile>
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
                          ) : (
                            <>
                              <DashboardContainer className="max-md:hidden">
                                <DetailCard>
                                  <DetailCardLeft>
                                    <DetailCardHeader>
                                      <DetailCardTitle>
                                        {t("heading")}
                                      </DetailCardTitle>

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

                                    {userTaskList}
                                    {pagination}
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
                                        {backButton && (
                                          <BackButton fallbackHref="/team" />
                                        )}
                                        <PageHeadingMobile>
                                          {t("heading")}
                                        </PageHeadingMobile>
                                      </>
                                    }
                                    secondSlot={
                                      <CreateTaskModalTriggerMobile />
                                    }
                                  />

                                  <ToolbarMobile
                                    firstSlot={navigationMobile}
                                    secondSlot={
                                      <TaskSortingMenuTriggerMobile
                                        selectedSortField={selectedSortField}
                                      />
                                    }
                                  />

                                  {userTaskList}
                                  {pagination}
                                </DashboardGrid>
                              </DashboardContainer>
                            </>
                          )}
                        </ViewModeProvider>

                        <TaskSearchModal searchContainer={searchContainer} />
                        <DeleteTasksModal />
                        <ChangePasswordModal />
                        <CreateTaskModal
                          createTaskFormContainer={createTaskFormContainer}
                        />
                        <UpdateUserModal
                          updateUserFormContainer={updateUserFormContainer}
                        />
                        <UpdateUserImageModal userId={user.id} />
                        <DeleteUserImageModal
                          userId={user.id}
                          userFullName={user.fullName}
                        />
                      </CreateTaskProvider>
                    </DeleteTasksProvider>
                  </UpdateTaskStatusesProvider>
                </SelectedTasksProvider>
              </ChangePasswordProvider>
            </UpdateUserProvider>
          </DeleteUserProvider>
        </ClearUserImageUrlProvider>
      </UpdateUserImageProvider>
    </UpdateUserImageFileProvider>
  );
}
