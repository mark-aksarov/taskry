import {
  ProfileCard,
  ProfileCardLeft,
  ProfileCardRight,
  ProfileCardTitle,
  ProfileCardHeader,
} from "@/components/profile/ProfileCard";

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

interface ProfileTasksPageProps {
  userId: string;
  ProfileTasksContainer: React.ComponentType<{ userId: string }>;
  ProfileHeaderContainer: React.ComponentType<{ userId: string }>;
  NewTaskFormContainer: React.ComponentType;
  profileNavigationDesktop: React.ReactNode;
  profileNavigationMobile: React.ReactNode;
}

export function ProfileTasksPage({
  userId,
  ProfileTasksContainer,
  ProfileHeaderContainer,
  NewTaskFormContainer,
  profileNavigationDesktop,
  profileNavigationMobile,
}: ProfileTasksPageProps) {
  return (
    <>
      <PageContainer className="max-md:hidden">
        <ProfileCard>
          <ProfileCardLeft>
            <ProfileCardHeader>
              <ProfileCardTitle>Assigned tasks</ProfileCardTitle>
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
            </ProfileCardHeader>
            <ProfileTasksContainer userId={userId} />
          </ProfileCardLeft>

          <ProfileCardRight>
            <ProfileHeaderContainer userId={userId} />
            {profileNavigationDesktop}
          </ProfileCardRight>
        </ProfileCard>
      </PageContainer>

      <PageContainer className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
            <TaskToolbarSortingMenuTrigger />
            <TaskToolbarActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            {profileNavigationMobile}
            <NewTaskModalTrigger newTaskForm={<NewTaskFormContainer />} />
          </ToolbarMobileBottom>

          <ProfileTasksContainer userId={userId} />
        </PageGrid>
      </PageContainer>
    </>
  );
}
