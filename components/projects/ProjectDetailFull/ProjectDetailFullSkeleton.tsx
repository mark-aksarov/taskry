import { DetailInfo } from "@/components/common/Detail";
import { Skeleton } from "@/components/ui";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { Repeat } from "@/components/common/Repeat";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { ProjectDetailFullLayout } from "./ProjectDetailFullLayout";

export function ProjectDetailFullSkeleton() {
  return (
    <ProjectDetailFullLayout
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
