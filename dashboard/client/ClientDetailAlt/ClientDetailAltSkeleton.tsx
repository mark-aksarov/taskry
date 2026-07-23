import { DetailInfoAltSkeleton } from "@/dashboard/common/Detail";
import { ClientDetailAltLayout } from "./ClientDetailAltLayout";

export function ClientDetailAltSkeleton() {
  return (
    <ClientDetailAltLayout
      bioSlot={<DetailInfoAltSkeleton surface />}
      fullNameSlot={<DetailInfoAltSkeleton surface />}
      emailSlot={<DetailInfoAltSkeleton surface />}
      phoneNumberSlot={<DetailInfoAltSkeleton surface />}
      companySlot={<DetailInfoAltSkeleton surface />}
      publicLinkSlot={<DetailInfoAltSkeleton surface />}
    />
  );
}
