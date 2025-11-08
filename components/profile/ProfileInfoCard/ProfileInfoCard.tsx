import { Card } from "@/components/common/Card";
import { ProfileNavigationDesktop } from "@/components/profile/ProfileNavigationDesktop";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileHeader";
import { ProfileInfoSkeleton } from "@/components/profile/ProfileInfo";
import { Suspense } from "react";
import {
  ProfileCardLeft,
  ProfileCardHeader,
  ProfileCardTitle,
  ProfileCardRight,
} from "../ProfileCard";

export function ProfileInfoCard({
  ProfileHeaderContainer,
  ProfileInfoContainer,
}: {
  ProfileHeaderContainer: React.ComponentType;
  ProfileInfoContainer: React.ComponentType;
}) {
  return (
    <Card className="flex p-0 max-md:hidden">
      <ProfileCardLeft>
        <ProfileCardHeader>
          <ProfileCardTitle>Profile Information</ProfileCardTitle>
        </ProfileCardHeader>
        <div className="p-6">
          <Suspense fallback={<ProfileInfoSkeleton />}>
            <ProfileInfoContainer />
          </Suspense>
        </div>
      </ProfileCardLeft>

      <ProfileCardRight>
        <Suspense fallback={<ProfileHeaderSkeleton />}>
          <ProfileHeaderContainer />
        </Suspense>
        <ProfileNavigationDesktop />
      </ProfileCardRight>
    </Card>
  );
}
