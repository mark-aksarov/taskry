import {
  DetailInfo,
  DetailText,
  DetailTitle,
  DetailRow,
  DetailInfoSkeleton,
} from "@/components/common/Detail";
import { TaskPreview } from "@/lib/queries/types";

export function TaskInfoInner({
  task,
  formattedDeadline,
}: {
  task?: TaskPreview;
  formattedDeadline?: string;
}) {
  const rowStyles = "max-lg:flex-col max-lg:gap-4";

  return (
    <div className="flex flex-col gap-4">
      <DetailRow className={rowStyles}>
        {!task ? (
          <>
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Description</DetailTitle>
              <DetailText>{task.description}</DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {!task ? (
          <>
            <DetailInfoSkeleton />
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Title</DetailTitle>
              <DetailText>{task.title}</DetailText>
            </DetailInfo>
            <DetailInfo>
              <DetailTitle>Deadline</DetailTitle>
              <DetailText>{formattedDeadline}</DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {!task ? (
          <>
            <DetailInfoSkeleton />
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Assigned To</DetailTitle>
              <DetailText>Unknown assignee</DetailText>
            </DetailInfo>
            <DetailInfo>
              <DetailTitle>Creator</DetailTitle>
              <DetailText>
                {task.creator ? task.creator.fullName : "Unknown creator"}
              </DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {!task ? (
          <>
            <DetailInfoSkeleton />
            <DetailInfoSkeleton />
          </>
        ) : (
          <>
            <DetailInfo>
              <DetailTitle>Category</DetailTitle>
              <DetailText>{task.category.name}</DetailText>
            </DetailInfo>
            <DetailInfo>
              <DetailTitle>Status</DetailTitle>
              <DetailText>{task.status.nameEn}</DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>

      <DetailRow className={rowStyles}>
        {!task ? (
          <>
            <DetailInfoSkeleton className="border-none" />
          </>
        ) : (
          <>
            <DetailInfo className="border-none">
              <DetailTitle>Project</DetailTitle>
              <DetailText>{task.project.title}</DetailText>
            </DetailInfo>
          </>
        )}
      </DetailRow>
    </div>
  );
}
