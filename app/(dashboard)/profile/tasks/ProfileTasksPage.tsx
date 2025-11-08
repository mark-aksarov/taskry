import {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardLeft,
  ProfileCardRight,
  ProfileCardTitle,
} from "@/components/profile/ProfileCard";
import { Suspense } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileHeader";
import { ProfileTasksMobile } from "@/components/profile/ProfileTasksMobile";
import { ProfileTasksDesktop } from "@/components/profile/ProfileTasksDesktop";
import { ProfileNavigationDesktop } from "@/components/profile/ProfileNavigationDesktop";

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
            <Suspense fallback={<ProfileTasksDesktop />}>
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

      <Suspense fallback={<ProfileTasksMobile />}>
        <ProfileTasksMobileContainer />
      </Suspense>
    </>
  );
}
