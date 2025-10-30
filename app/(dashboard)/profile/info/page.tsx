import { Suspense } from "react";
import { getUserById } from "@/lib/queries/user";
import {
  ProfileInfo,
  ProfileInfoSkeleton,
} from "@/components/profile/ProfileInfo";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProfileDetailCard } from "@/components/profile/ProfileDetailCard";
import { PageContainer } from "@/components/common/PageContainer";

export default async function ProfileInfoPage() {
  const userPromise = getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <PageContainer>
      <ProfileDetailCard />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Profile Information</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <Card>
          <Suspense fallback={<ProfileInfoSkeleton />}>
            <ProfileInfo userPromise={userPromise} />
          </Suspense>
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
