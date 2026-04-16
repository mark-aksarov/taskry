import { DetailInfoAltSkeleton } from "@/components/common/Detail";
import { UserDetailAltLayout } from "./UserDetailAltLayout";

export function UserDetailAltSkeleton() {
  return (
    <UserDetailAltLayout
      bioSlot={<DetailInfoAltSkeleton surface />}
      fullNameSlot={<DetailInfoAltSkeleton surface />}
      positionSlot={<DetailInfoAltSkeleton surface />}
      emailSlot={<DetailInfoAltSkeleton surface />}
      phoneNumberSlot={<DetailInfoAltSkeleton surface />}
      addressSlot={<DetailInfoAltSkeleton surface />}
      publicLinkSlot={<DetailInfoAltSkeleton surface />}
      birthdateSlot={<DetailInfoAltSkeleton surface />}
    />
  );
}
