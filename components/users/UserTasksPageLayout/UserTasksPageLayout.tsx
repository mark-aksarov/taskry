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

import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { NewTaskModalTrigger } from "@/components/tasks/NewTaskModalTrigger";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";

interface UserTasksPageLayoutProps {
  userId: string;
  UserTasksContainer: React.ComponentType<{ userId: string }>;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
  NewTaskFormContainer: React.ComponentType;
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
}

export function UserTasksPageLayout({
  userId,
  UserTasksContainer,
  UserHeaderContainer,
  NewTaskFormContainer,
  navigationDesktop,
  navigationMobile,
}: UserTasksPageLayoutProps) {
  return (
    <>
      <PageContainer className="max-md:hidden">
        <UserCard>
          <UserCardLeft>
            <UserCardHeader>
              <UserCardTitle>Assigned tasks</UserCardTitle>
              <div className="flex gap-4">
                <TaskToolbarSortingMenuTrigger />
                <TaskToolbarActionsMenuTrigger />
                <NewTaskModalTrigger
                  newTaskForm={
                    <Suspense fallback={<TaskFormBaseSkeleton />}>
                      <NewTaskFormContainer />
                    </Suspense>
                  }
                />
              </div>
            </UserCardHeader>
            <UserTasksContainer userId={userId} />
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
            <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
            <TaskToolbarSortingMenuTrigger />
            <TaskToolbarActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            {navigationMobile}
            <NewTaskModalTrigger newTaskForm={<NewTaskFormContainer />} />
          </ToolbarMobileBottom>

          <UserTasksContainer userId={userId} />
        </PageGrid>
      </PageContainer>
    </>
  );
}
