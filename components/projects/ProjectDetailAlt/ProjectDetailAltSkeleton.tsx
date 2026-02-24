import { Skeleton } from "@/components/ui/Skeleton";
import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";
import { DetailInfo, DetailInfoSkeleton } from "@/components/common/Detail";

export function ProjectDetailAltSkeleton() {
  return (
    <ProjectDetailAltLayout
      descriptionSlot={
        <DetailInfo>
          <Skeleton className="w-[7rem]" size="xs" />
          <Skeleton size="sm" className="w-[15rem]" />
        </DetailInfo>
      }
      statusSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      customerSlot={<DetailInfoSkeleton />}
      categorySlot={<DetailInfoSkeleton />}
      creatorSlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
