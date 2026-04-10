import { DetailInfoSkeleton } from "@/components/common/Detail";
import { UserDetailAltLayout } from "./UserDetailAltLayout";

export function UserDetailAltSkeleton() {
  return (
    <UserDetailAltLayout
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
