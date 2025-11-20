import { DetailInfoSkeleton } from "@/components/common/Detail";
import { ProfileDetailLayout } from "./ProfileDetailLayout";

export function ProfileDetailSkeleton() {
  return (
    <ProfileDetailLayout
      bioSlot={<DetailInfoSkeleton />}
      fullNameSlot={<DetailInfoSkeleton />}
      positionSlot={<DetailInfoSkeleton />}
      emailSlot={<DetailInfoSkeleton />}
      phoneNumberSlot={<DetailInfoSkeleton />}
      addressSlot={<DetailInfoSkeleton />}
      publicLinkSlot={<DetailInfoSkeleton />}
      birthdateSlot={<DetailInfoSkeleton className="border-none" />}
    />
  );
}
