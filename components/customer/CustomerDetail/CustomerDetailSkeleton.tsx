import { DetailInfoSkeleton } from "@/components/common/Detail";
import { CustomerDetailLayout } from "./CustomerDetailLayout";

export function CustomerDetailSkeleton() {
  return (
    <CustomerDetailLayout
      bioSlot={<DetailInfoSkeleton />}
      fullNameSlot={<DetailInfoSkeleton />}
      emailSlot={<DetailInfoSkeleton />}
      phoneNumberSlot={<DetailInfoSkeleton />}
      publicLinkSlot={<DetailInfoSkeleton className="md:border-none md:pb-0" />}
      companySlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
