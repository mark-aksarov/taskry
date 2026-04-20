import { DetailInfoAltSkeleton } from "@/dashboard/common/Detail";
import { CustomerDetailAltLayout } from "./CustomerDetailAltLayout";

export function CustomerDetailAltSkeleton() {
  return (
    <CustomerDetailAltLayout
      bioSlot={<DetailInfoAltSkeleton surface />}
      fullNameSlot={<DetailInfoAltSkeleton surface />}
      emailSlot={<DetailInfoAltSkeleton surface />}
      phoneNumberSlot={<DetailInfoAltSkeleton surface />}
      companySlot={<DetailInfoAltSkeleton surface />}
      publicLinkSlot={<DetailInfoAltSkeleton surface />}
    />
  );
}
