import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileHeader";
import { ProfileDetailSkeleton } from "@/components/profile/ProfileDetail";
import { ProfileDetailCard } from "@/components/profile/ProfileDetailCard";
import { ProfileNavigationMobile } from "@/components/profile/ProfileNavigationMobile";

interface ProfilePageProps {
  userId: string;
  ProfileDetailContainer: React.ComponentType<{ userId: string }>;
  ProfileHeaderContainer: React.ComponentType<{ userId: string }>;
}

export function ProfilePage({
  userId,
  ProfileDetailContainer,
  ProfileHeaderContainer,
}: ProfilePageProps) {
  return (
    <PageContainer>
      <ProfileDetailCard
        profileDetail={
          <Suspense fallback={<ProfileDetailSkeleton />}>
            <ProfileDetailContainer userId={userId} />
          </Suspense>
        }
        profileHeader={
          <Suspense fallback={<ProfileHeaderSkeleton />}>
            <ProfileHeaderContainer userId={userId} />
          </Suspense>
        }
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
            <ProfileHeaderContainer userId={userId} />
          </Suspense>
          <ProfileActions />
        </Card>

        <Card className="flex flex-col gap-6">
          <Suspense fallback={<ProfileDetailSkeleton />}>
            <ProfileDetailContainer userId={userId} />
          </Suspense>
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
