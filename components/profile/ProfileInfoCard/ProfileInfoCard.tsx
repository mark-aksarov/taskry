import { Card } from "@/components/common/Card";
import { ProfileNavigationDesktop } from "@/components/profile/ProfileNavigationDesktop";
import {
  ProfileHeader,
  ProfileHeaderSkeleton,
} from "@/components/profile/ProfileHeader";
import {
  ProfileInfo,
  ProfileInfoSkeleton,
} from "@/components/profile/ProfileInfo";
import { getUserById } from "@/lib/queries/user";
import { Suspense } from "react";
import {
  ProfileCardLeft,
  ProfileCardHeader,
  ProfileCardTitle,
  ProfileCardRight,
} from "../ProfileCard";

export async function ProfileInfoCard() {
  const userPromise = getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <Card className="flex p-0 max-md:hidden">
      <ProfileCardLeft>
        <ProfileCardHeader>
          <ProfileCardTitle>Profile Information</ProfileCardTitle>
        </ProfileCardHeader>
        <div className="p-6">
          <Suspense fallback={<ProfileInfoSkeleton />}>
            <ProfileInfo userPromise={userPromise} />
          </Suspense>
        </div>
      </ProfileCardLeft>

      <ProfileCardRight>
        <Suspense fallback={<ProfileHeaderSkeleton />}>
          <ProfileHeader />
        </Suspense>
        <ProfileNavigationDesktop />
      </ProfileCardRight>
    </Card>
  );
}
