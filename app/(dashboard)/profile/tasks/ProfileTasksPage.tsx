import {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardLeft,
  ProfileCardRight,
  ProfileCardTitle,
} from "@/components/profile/ProfileCard";
import { Suspense } from "react";
import { Repeat } from "@/components/common/Repeat";
import { PageContainer } from "@/components/common/PageContainer";
import { ProfileTaskList } from "@/components/profile/ProfileTaskList";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileHeader";
import { ProfileTaskListItemSkeleton } from "@/components/profile/ProfileTaskListItem";
import { ProfileNavigationDesktop } from "@/components/profile/ProfileNavigationDesktop";
import { ProfileTasksMobileLayout } from "@/components/profile/ProfileTasksMobile";

interface ProfileTasksPageProps {
  ProfileTasksDesktopContainer: React.ComponentType;
  ProfileTasksMobileContainer: React.ComponentType;
  ProfileHeaderContainer: React.ComponentType;
}

export function ProfileTasksPage({
  ProfileTasksDesktopContainer,
  ProfileTasksMobileContainer,
  ProfileHeaderContainer,
}: ProfileTasksPageProps) {
  return (
    <>
      <PageContainer className="max-md:hidden">
        <ProfileCard>
          <ProfileCardLeft>
            <ProfileCardHeader>
              <ProfileCardTitle>Assigned tasks</ProfileCardTitle>
            </ProfileCardHeader>
            <Suspense
              fallback={
                <ProfileTaskList>
                  <Repeat
                    items={10}
                    renderItem={() => <ProfileTaskListItemSkeleton />}
                  />
                </ProfileTaskList>
              }
            >
              <ProfileTasksDesktopContainer />
            </Suspense>
          </ProfileCardLeft>

          <ProfileCardRight>
            <Suspense fallback={<ProfileHeaderSkeleton />}>
              <ProfileHeaderContainer />
            </Suspense>
            <ProfileNavigationDesktop />
          </ProfileCardRight>
        </ProfileCard>
      </PageContainer>

      <Suspense
        fallback={
          <ProfileTasksMobileLayout>
            <ProfileTaskList>
              <Repeat
                items={10}
                renderItem={() => <ProfileTaskListItemSkeleton />}
              />
            </ProfileTaskList>
          </ProfileTasksMobileLayout>
        }
      >
        <ProfileTasksMobileContainer />
      </Suspense>
    </>
  );
}
