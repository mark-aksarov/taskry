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

export default async function ProfileInfoPage() {
  const userPromise = getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <>
      <ProfileDetailCard />

      <div className="md:hidden">
        <PageGrid>
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Profile Information</ToolbarMobileHeading>
          </ToolbarMobileTop>
          <Card>
            <Suspense fallback={<ProfileInfoSkeleton />}>
              <ProfileInfo userPromise={userPromise} />
            </Suspense>
          </Card>
        </PageGrid>
      </div>
    </>
  );
}
