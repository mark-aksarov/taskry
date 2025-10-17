import {
  EntityCard,
  EntityDetailsInfo,
  EntityDetailsText,
  EntityDetailsTitle,
  EntityDetailsRow,
  EntityDetailsInfoSkeleton,
} from "@/components/common/Entity";
import { Button, Skeleton } from "@/components/ui";
import { TaskPreview } from "@/lib/queries/types";
import { twMerge } from "tailwind-merge";

export function TaskDetailsCardInner({
  task,
  formattedDeadline,
}: {
  task?: TaskPreview;
  formattedDeadline?: string;
}) {
  const buttonClasses = "max-md:justify-center md:self-start";

  return (
    <EntityCard>
      <EntityDetailsRow>
        {!task ? (
          <>
            <EntityDetailsInfoSkeleton />
            <EntityDetailsInfoSkeleton />
          </>
        ) : (
          <>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Title</EntityDetailsTitle>
              <EntityDetailsText>{task.title}</EntityDetailsText>
            </EntityDetailsInfo>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Category</EntityDetailsTitle>
              <EntityDetailsText>{task.category.name}</EntityDetailsText>
            </EntityDetailsInfo>
          </>
        )}
      </EntityDetailsRow>

      <EntityDetailsRow>
        {!task ? (
          <>
            <EntityDetailsInfoSkeleton />
            <EntityDetailsInfoSkeleton />
          </>
        ) : (
          <>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Deadline</EntityDetailsTitle>
              <EntityDetailsText>{formattedDeadline}</EntityDetailsText>
            </EntityDetailsInfo>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Status</EntityDetailsTitle>
              <EntityDetailsText>{task.status.nameEn}</EntityDetailsText>
            </EntityDetailsInfo>
          </>
        )}
      </EntityDetailsRow>

      <EntityDetailsRow>
        {!task ? (
          <>
            <EntityDetailsInfoSkeleton />
            <EntityDetailsInfoSkeleton />
          </>
        ) : (
          <>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Project</EntityDetailsTitle>
              <EntityDetailsText>{task.project.title}</EntityDetailsText>
            </EntityDetailsInfo>
            <EntityDetailsInfo>
              <EntityDetailsTitle>Creator</EntityDetailsTitle>
              <EntityDetailsText>
                {task.creator ? task.creator.fullName : "Unknown creator"}
              </EntityDetailsText>
            </EntityDetailsInfo>
          </>
        )}
      </EntityDetailsRow>

      {!task ? (
        <Skeleton
          className={twMerge("h-8 rounded-lg md:w-[4.6rem]", buttonClasses)}
        />
      ) : (
        <Button
          variant="outlined"
          label="Edit task"
          className={buttonClasses}
        />
      )}
    </EntityCard>
  );
}
