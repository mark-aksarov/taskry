import { Suspense } from "react";
import { Card } from "@/components/common/Card";
import { PageContainer } from "@/components/common/PageContainer";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileHeader";
import { ProfileInfoSkeleton } from "@/components/profile/ProfileInfo";
import { ProfileInfoCard } from "@/components/profile/ProfileInfoCard";
import { ProfileNavigationMobile } from "@/components/profile/ProfileNavigationMobile";

interface ProfilePageProps {
  ProfileInfoContainer: React.ComponentType;
  ProfileHeaderContainer: React.ComponentType;
}

export function ProfilePage({
  ProfileInfoContainer,
  ProfileHeaderContainer,
}: ProfilePageProps) {
  return (
    <PageContainer>
      <ProfileInfoCard
        ProfileInfoContainer={ProfileInfoContainer}
        ProfileHeaderContainer={ProfileHeaderContainer}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Profile Settings</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ProfileNavigationMobile />
        </ToolbarMobileBottom>

        <Card className="flex flex-col gap-6">
          <Suspense fallback={<ProfileHeaderSkeleton />}>
            <ProfileHeaderContainer />
          </Suspense>
          <ProfileActions />
        </Card>

        <Card className="flex flex-col gap-6">
          <Suspense fallback={<ProfileInfoSkeleton />}>
            <ProfileInfoContainer />
          </Suspense>
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
