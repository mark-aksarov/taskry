import { DetailInfoSkeleton } from "@/components/common/Detail";
import { UserDetailLayout } from "./UserDetailLayout";

export function UserDetailSkeleton() {
  return (
    <UserDetailLayout
      bioSlot={<DetailInfoSkeleton />}
      fullNameSlot={<DetailInfoSkeleton />}
      positionSlot={<DetailInfoSkeleton />}
      emailSlot={<DetailInfoSkeleton />}
      phoneNumberSlot={<DetailInfoSkeleton />}
      addressSlot={<DetailInfoSkeleton />}
      publicLinkSlot={<DetailInfoSkeleton />}
      birthdateSlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
