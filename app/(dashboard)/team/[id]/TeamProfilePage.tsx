import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileHeader";
import { ProfileDetailSkeleton } from "@/components/profile/ProfileDetail";
import { ProfileDetailCard } from "@/components/profile/ProfileDetailCard";
import { UserProfileNavigationMobile } from "@/components/users/UserProfileNavigationMobile";
import { UserProfileNavigationDesktop } from "@/components/users/UserProfileNavigationDesktop";

interface TeamProfilePageProps {
  userId: string;
  ProfileDetailContainer: React.ComponentType<{ userId: string }>;
  ProfileHeaderContainer: React.ComponentType<{ userId: string }>;
}

export function TeamProfilePage({
  userId,
  ProfileDetailContainer,
  ProfileHeaderContainer,
}: TeamProfilePageProps) {
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
        profileNavigationDesktop={<UserProfileNavigationDesktop />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>User Information</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <UserProfileNavigationMobile />
        </ToolbarMobileBottom>

        <Card className="flex flex-col gap-6">
          <Suspense fallback={<ProfileHeaderSkeleton />}>
            <ProfileHeaderContainer userId={userId} />
          </Suspense>
          <Suspense fallback={<ProfileDetailSkeleton />}>
            <ProfileDetailContainer userId={userId} />
          </Suspense>
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
