import { DetailInfoSkeleton } from "@/dashboard/common/Detail";
import { CustomerDetailLayout } from "./CustomerDetailLayout";

export function CustomerDetailSkeleton() {
  return (
    <CustomerDetailLayout
      bioSlot={<DetailInfoSkeleton />}
      fullNameSlot={<DetailInfoSkeleton />}
      emailSlot={<DetailInfoSkeleton />}
      phoneNumberSlot={<DetailInfoSkeleton />}
      companySlot={<DetailInfoSkeleton />}
      publicLinkSlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
