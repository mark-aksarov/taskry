import { DetailInfoSkeleton } from "@/components/common/Detail";
import { ProfileInfoLayout } from "./ProfileInfoLayout";

export function ProfileInfoSkeleton() {
  return (
    <ProfileInfoLayout
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
