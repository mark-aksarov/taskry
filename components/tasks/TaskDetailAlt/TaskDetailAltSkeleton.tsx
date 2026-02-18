import { DetailInfo, DetailInfoSkeleton } from "@/components/common/Detail";
import { TaskDetailAltLayout } from "./TaskDetailAltLayout";
import { Skeleton } from "@/components/ui/Skeleton";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";

export function TaskDetailAltSkeleton() {
  return (
    <TaskDetailAltLayout
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
      assigneesSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      creatorSlot={<DetailInfoSkeleton />}
      categoryNameSlot={<DetailInfoSkeleton />}
      statusSlot={<DetailInfoSkeleton />}
      projectTitleSlot={<DetailInfoSkeleton />}
      subtasksSlot={
        <DetailInfo className="border-none pb-0">
          <FieldSkeleton>
            <Skeleton size="sm" className="w-[7rem]" />
            <Skeleton size="sm" className="w-[7rem]" />
            <Skeleton size="sm" className="w-[7rem]" />
          </FieldSkeleton>
        </DetailInfo>
      }
    />
  );
}
