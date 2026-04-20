import { Skeleton } from "@/ui/Skeleton";
import { ProjectDetailLayout } from "./ProjectDetailLayout";
import { DetailInfo, DetailInfoSkeleton } from "@/dashboard/common/Detail";

export function ProjectDetailSkeleton() {
  return (
    <ProjectDetailLayout
      titleSlot={<Skeleton size="base" className="w-[15rem]" />}
      creatorSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      descriptionSlot={
        <DetailInfo>
          <Skeleton className="w-[7rem]" size="xs" />
          <Skeleton size="sm" className="w-[15rem]" />
        </DetailInfo>
      }
      statusSlot={<DetailInfoSkeleton />}
      categorySlot={<DetailInfoSkeleton />}
      customerSlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
