import { DetailInfo } from "@/components/common/Detail";
import { TaskDetailFullLayout } from "./TaskDetailFullLayout";
import { Skeleton } from "@/components/ui";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { Repeat } from "@/components/common/Repeat";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";

export function TaskDetailFullSkeleton() {
  return (
    <TaskDetailFullLayout
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
      subtasksSlot={
        <DetailInfo>
          <FieldSkeleton>
            <Skeleton size="sm" />
            <Skeleton size="sm" />
            <Skeleton size="sm" />
          </FieldSkeleton>
        </DetailInfo>
      }
      attachmentsSlot={
        <DetailInfo>
          <FieldSkeleton>
            <Skeleton size="sm" />
            <Skeleton size="sm" />
            <Skeleton size="sm" />
          </FieldSkeleton>
        </DetailInfo>
      }
      commentsSlot={
        <DetailInfo className="border-none pb-0">
          <Repeat items={3} renderItem={() => <CommentItemSkeleton />} />
        </DetailInfo>
      }
    />
  );
}
