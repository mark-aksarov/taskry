import { Skeleton } from "@/components/ui/Skeleton";
import { TaskDetailLayout } from "./TaskDetailLayout";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { DetailInfo, DetailInfoSkeleton } from "@/components/common/Detail";

export function TaskDetailSkeleton() {
  return (
    <TaskDetailLayout
      titleSlot={<Skeleton size="base" className="w-[15rem]" />}
      descriptionSlot={
        <DetailInfo>
          <Skeleton className="w-[7rem]" size="xs" />
          <Skeleton size="sm" className="w-[15rem]" />
        </DetailInfo>
      }
      assigneesSlot={<DetailInfoSkeleton />}
      deadlineSlot={<DetailInfoSkeleton />}
      creatorSlot={<DetailInfoSkeleton />}
      statusSlot={<DetailInfoSkeleton />}
      categoryNameSlot={<DetailInfoSkeleton />}
      projectTitleSlot={<DetailInfoSkeleton />}
      subtasksSlot={
        <DetailInfo className="border-none pb-0">
          <FieldSkeleton>
            <Skeleton size="sm" className="w-[12rem]" />
            <Skeleton size="sm" className="w-[15rem]" />
            <Skeleton size="sm" className="w-[13rem]" />
          </FieldSkeleton>
        </DetailInfo>
      }
    />
  );
}
