import { Card } from "@/components/common/Card";
import { ProfileNavigationDesktop } from "@/components/profile/ProfileNavigationDesktop";
import { ProfileHeaderSkeleton } from "@/components/profile/ProfileHeader";
import { ProfileDetailSkeleton } from "@/components/profile/ProfileDetail";
import { Suspense } from "react";
import {
  ProfileCardLeft,
  ProfileCardHeader,
  ProfileCardTitle,
  ProfileCardRight,
} from "../ProfileCard";

export function ProfileDetailCard({
  ProfileHeaderContainer,
  ProfileDetailContainer,
}: {
  ProfileHeaderContainer: React.ComponentType;
  ProfileDetailContainer: React.ComponentType;
}) {
  return (
    <Card className="flex p-0 max-md:hidden">
      <ProfileCardLeft>
        <ProfileCardHeader>
          <ProfileCardTitle>Profile Information</ProfileCardTitle>
        </ProfileCardHeader>
        <div className="p-6">
          <Suspense fallback={<ProfileDetailSkeleton />}>
            <ProfileDetailContainer />
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
