import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { UserHeaderSkeleton } from "@/components/users/UserHeader";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

interface TeamProfilePageProps {
  userId: string;
  UserDetailContainer: React.ComponentType<{ userId: string }>;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
}

export function TeamProfilePage({
  userId,
  UserDetailContainer,
  UserHeaderContainer,
}: TeamProfilePageProps) {
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
        navigationDesktop={<UserNavigationDesktop />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>User Information</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <UserNavigationMobile />
        </ToolbarMobileBottom>

        <Card className="flex flex-col gap-6">
          <Suspense fallback={<UserHeaderSkeleton />}>
            <UserHeaderContainer userId={userId} />
          </Suspense>
          <Suspense fallback={<UserDetailSkeleton />}>
            <UserDetailContainer userId={userId} />
          </Suspense>
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
