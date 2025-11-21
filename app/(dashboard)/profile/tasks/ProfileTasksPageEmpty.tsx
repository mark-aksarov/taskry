import {
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";

import {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardLeft,
  ProfileCardRight,
  ProfileCardTitle,
} from "@/components/profile/ProfileCard";

import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { ProfileTasksEmptySection } from "@/components/profile/ProfileTasksEmptySection";

interface ProfileTasksPageEmptyProps {
  userId: string;
  ProfileHeaderContainer: React.ComponentType<{ userId: string }>;
  profileNavigationDesktop: React.ReactNode;
  profileNavigationMobile: React.ReactNode;
}

export function ProfileTasksPageEmpty({
  userId,
  ProfileHeaderContainer,
  profileNavigationDesktop,
  profileNavigationMobile,
}: ProfileTasksPageEmptyProps) {
  return (
    <>
      <PageContainer className="max-md:hidden">
        <ProfileCard>
          <ProfileCardLeft>
            <ProfileCardHeader>
              <ProfileCardTitle>Assigned tasks</ProfileCardTitle>
            </ProfileCardHeader>

            <ProfileTasksEmptySection />
          </ProfileCardLeft>

          <ProfileCardRight>
            <ProfileHeaderContainer userId={userId} />
            {profileNavigationDesktop}
          </ProfileCardRight>
        </ProfileCard>
      </PageContainer>

      <PageContainer fullscreen className="md:hidden">
        <PageGrid className="flex-auto">
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <ToolbarMobileBottom>{profileNavigationMobile}</ToolbarMobileBottom>

          <ProfileTasksEmptySection />
        </PageGrid>
      </PageContainer>
    </>
  );
}
