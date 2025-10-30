import {
  DetailCard,
  DetailCardHeader,
  DetailCardLeft,
  DetailCardTitle,
} from "@/components/common/Detail";
import { DetailPanel } from "@/components/common/DetailPanel";
import { ProfileDetailNavigation } from "@/components/profile/ProfileDetailNavigation";
import {
  ProfileDetailPanelHeader,
  ProfileDetailPanelHeaderSkeleton,
} from "@/components/profile/ProfileDetailPanelHeader";
import {
  ProfileInfo,
  ProfileInfoSkeleton,
} from "@/components/profile/ProfileInfo";
import { getUserById } from "@/lib/queries/user";
import { Suspense } from "react";

export async function ProfileDetailCard() {
  const userPromise = getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <DetailCard className="max-md:hidden">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>Profile Information</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">
          <Suspense fallback={<ProfileInfoSkeleton />}>
            <ProfileInfo userPromise={userPromise} />
          </Suspense>
        </div>
      </DetailCardLeft>

      <DetailPanel>
        <Suspense fallback={<ProfileDetailPanelHeaderSkeleton />}>
          <ProfileDetailPanelHeader />
        </Suspense>
        <ProfileDetailNavigation />
      </DetailPanel>
    </DetailCard>
  );
}
