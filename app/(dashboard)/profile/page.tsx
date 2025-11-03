import { Suspense } from "react";
import {
  ProfileHeader,
  ProfileHeaderSkeleton,
} from "@/components/profile/ProfileHeader";
import { ProfileNavigationMobile } from "@/components/profile/ProfileNavigationMobile";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProfileInfoCard } from "@/components/profile/ProfileInfoCard";
import { PageContainer } from "@/components/common/PageContainer";
import { ProfileActions } from "@/components/profile/ProfileActions";
import {
  ProfileInfo,
  ProfileInfoSkeleton,
} from "@/components/profile/ProfileInfo";
import { getUserById } from "@/lib/queries/user";

export default async function ProfilePage() {
  const userPromise = getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <PageContainer>
      <ProfileInfoCard />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Profile Settings</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <ToolbarMobileBottom>
          <ProfileNavigationMobile />
        </ToolbarMobileBottom>

        <Card className="flex flex-col gap-6">
          <Suspense fallback={<ProfileHeaderSkeleton />}>
            <ProfileHeader />
          </Suspense>
          <ProfileActions />
        </Card>

        <Card className="flex flex-col gap-6">
          <Suspense fallback={<ProfileInfoSkeleton />}>
            <ProfileInfo userPromise={userPromise} />
          </Suspense>
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
