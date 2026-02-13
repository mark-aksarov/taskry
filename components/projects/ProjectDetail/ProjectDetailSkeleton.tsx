import { Skeleton } from "@/components/ui/Skeleton";
import { ProjectDetailLayout } from "./ProjectDetailLayout";
import { DetailInfo, DetailInfoSkeleton } from "@/components/common/Detail";

export function ProjectDetailSkeleton() {
  return (
    <ProjectDetailLayout
      titleSlot={<Skeleton size="base" className="w-[15rem]" />}
      actionsSlot={<Skeleton className="h-8 w-[5rem] rounded-lg" />}
      creatorSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      descriptionSlot={
        <DetailInfo>
          <Skeleton className="w-[7rem]" size="xs" />
          <div className="flex flex-col">
            <Skeleton size="sm" />
            <Skeleton size="sm" />
            <Skeleton size="sm" className="w-[15rem]" />
          </div>
        </DetailInfo>
      }
      customerSlot={<DetailInfoSkeleton className="lg:border-none lg:pb-0" />}
      categorySlot={<DetailInfoSkeleton className="border-none pb-0" />}
    />
  );
}
