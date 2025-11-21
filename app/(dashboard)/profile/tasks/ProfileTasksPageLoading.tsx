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

import { Skeleton } from "@/components/ui";
import { Repeat } from "@/components/common/Repeat";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { ProfileTaskList } from "@/components/profile/ProfileTaskList";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileHeader";
import { ProfileTaskListItemSkeleton } from "@/components/profile/ProfileTaskListItem";

interface ProfileTasksPageLoadingProps {
  profileNavigationDesktop: React.ReactNode;
  profileNavigationMobile: React.ReactNode;
}

export default function ProfileTasksPageLoading({
  profileNavigationDesktop,
  profileNavigationMobile,
}: ProfileTasksPageLoadingProps) {
  return (
    <>
      <PageContainer className="max-md:hidden">
        <ProfileCard>
          <ProfileCardLeft>
            <ProfileCardHeader>
              <ProfileCardTitle>Assigned tasks</ProfileCardTitle>
              <div className="flex gap-4">
                <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
                <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
                <Skeleton className="h-8 w-[6.25rem] rounded-lg" />
              </div>
            </ProfileCardHeader>
            <ProfileTaskList>
              <Repeat
                items={10}
                renderItem={() => <ProfileTaskListItemSkeleton />}
              />
            </ProfileTaskList>
          </ProfileCardLeft>

          <ProfileCardRight>
            <ProfileHeaderSkeleton />
            {profileNavigationDesktop}
          </ProfileCardRight>
        </ProfileCard>
      </PageContainer>

      <PageContainer className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            {profileNavigationMobile}
            <Skeleton className="h-8 w-[6.25rem] rounded-lg" />
          </ToolbarMobileBottom>

          <ProfileTaskList>
            <Repeat
              items={10}
              renderItem={() => <ProfileTaskListItemSkeleton />}
            />
          </ProfileTaskList>
        </PageGrid>
      </PageContainer>
    </>
  );
}
