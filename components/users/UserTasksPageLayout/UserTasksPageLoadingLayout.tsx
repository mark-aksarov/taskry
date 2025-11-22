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

import { Skeleton } from "@/components/ui";
import { Repeat } from "@/components/common/Repeat";
import { PageGrid } from "@/components/common/PageGrid";
import { UserTaskList } from "@/components/users/UserTaskList";
import { PageContainer } from "@/components/common/PageContainer";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { UserTaskListItemSkeleton } from "@/components/users/UserTaskListItem";

interface UserTasksPageLoadingLayoutProps {
  navigationDesktop: React.ReactNode;
  navigationMobile: React.ReactNode;
}

export function UserTasksPageLoadingLayout({
  navigationDesktop,
  navigationMobile,
}: UserTasksPageLoadingLayoutProps) {
  return (
    <>
      <PageContainer className="max-md:hidden">
        <UserCard>
          <UserCardLeft>
            <UserCardHeader>
              <UserCardTitle>Assigned tasks</UserCardTitle>
              <div className="flex gap-4">
                <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
                <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
                <Skeleton className="h-8 w-[6.25rem] rounded-lg" />
              </div>
            </UserCardHeader>
            <UserTaskList>
              <Repeat
                items={10}
                renderItem={() => <UserTaskListItemSkeleton />}
              />
            </UserTaskList>
          </UserCardLeft>

          <UserCardRight>
            <PersonHeaderSkeleton />
            {navigationDesktop}
          </UserCardRight>
        </UserCard>
      </PageContainer>

      <PageContainer className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            {navigationMobile}
            <Skeleton className="h-8 w-[6.25rem] rounded-lg" />
          </ToolbarMobileBottom>

          <UserTaskList>
            <Repeat
              items={10}
              renderItem={() => <UserTaskListItemSkeleton />}
            />
          </UserTaskList>
        </PageGrid>
      </PageContainer>
    </>
  );
}
