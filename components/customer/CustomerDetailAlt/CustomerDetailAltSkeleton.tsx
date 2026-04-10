import { DetailInfoSkeleton } from "@/components/common/Detail";
import { CustomerDetailAltLayout } from "./CustomerDetailAltLayout";

export function CustomerDetailAltSkeleton() {
  return (
    <CustomerDetailAltLayout
      bioSlot={<DetailInfoSkeleton />}
      fullNameSlot={<DetailInfoSkeleton />}
      emailSlot={<DetailInfoSkeleton />}
      phoneNumberSlot={<DetailInfoSkeleton />}
      companySlot={<DetailInfoSkeleton />}
      publicLinkSlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
