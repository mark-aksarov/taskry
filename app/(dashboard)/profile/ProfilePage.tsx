import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { ProfileActions } from "@/components/users/ProfileActions";
import { UserHeaderSkeleton } from "@/components/users/UserHeader";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

interface ProfilePageProps {
  userId: string;
  UserDetailContainer: React.ComponentType<{ userId: string }>;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
}

export function ProfilePage({
  userId,
  UserDetailContainer,
  UserHeaderContainer,
}: ProfilePageProps) {
  return (
    <PageContainer>
      <UserDetailCard
        profileDetail={
          <Suspense fallback={<UserDetailSkeleton />}>
            <UserDetailContainer userId={userId} />
          </Suspense>
        }
        profileHeader={
          <Suspense fallback={<UserHeaderSkeleton />}>
            <UserHeaderContainer userId={userId} />
          </Suspense>
        }
        navigationDesktop={<ProfileNavigationDesktop />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Profile Settings</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ProfileNavigationMobile />
        </ToolbarMobileBottom>

        <div className="flex flex-col px-1.5">
          <Suspense fallback={<UserHeaderSkeleton />}>
            <UserHeaderContainer userId={userId} />
          </Suspense>
        </div>

        <Card className="flex flex-col gap-6 px-1.5">
          <ProfileActions />
        </Card>

        <Card className="flex flex-col gap-6">
          <Suspense fallback={<UserDetailSkeleton />}>
            <UserDetailContainer userId={userId} />
          </Suspense>
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
