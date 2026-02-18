import { Skeleton } from "@/components/ui/Skeleton";
import { ProjectDetailLayout } from "./ProjectDetailLayout";
import { DetailInfo, DetailInfoSkeleton } from "@/components/common/Detail";

export function ProjectDetailSkeleton() {
  return (
    <ProjectDetailLayout
      titleSlot={<Skeleton size="base" className="w-[15rem]" />}
      creatorSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      descriptionSlot={
        <DetailInfo>
          <Skeleton className="w-[7rem]" size="xs" />
          <div className="flex flex-col">
            <Skeleton size="sm" className="w-[15rem]" />
            <Skeleton size="sm" className="w-[14rem]" />
            <Skeleton size="sm" className="w-[15rem]" />
          </div>
        </DetailInfo>
      }
      statusSlot={<DetailInfoSkeleton />}
      categorySlot={<DetailInfoSkeleton />}
      customerSlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
