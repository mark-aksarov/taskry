import { Skeleton } from "@/components/ui/Skeleton";
import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { DetailInfo, DetailInfoSkeleton } from "@/components/common/Detail";

export function ProjectDetailAltSkeleton() {
  return (
    <ProjectDetailAltLayout
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
      statusSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      customerSlot={<DetailInfoSkeleton />}
      categorySlot={<DetailInfoSkeleton />}
      creatorSlot={<DetailInfoSkeleton />}
      attachmentsSlot={
        <DetailInfo className="border-none pb-0">
          <FieldSkeleton>
            <Skeleton size="sm" />
            <Skeleton size="sm" />
            <Skeleton size="sm" />
          </FieldSkeleton>
        </DetailInfo>
      }
    />
  );
}
