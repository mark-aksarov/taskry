import {
  EntityCard,
  EntitySummaryInfo,
  EntitySummaryTitle,
  EntitySummaryText,
  EntitySummaryInfoSkeleton,
} from "@/components/common/Entity";
import { twMerge } from "tailwind-merge";
import { getTask } from "@/lib/queries/task";
import { TaskPreview } from "@/lib/queries/types";
import { Button, Divider, Skeleton } from "@/components/ui";

export async function TaskSummaryCard({ id }: { id: number }) {
  const task = await getTask(id);

  return <TaskSummaryCardInner task={task} />;
}

export function TaskSummaryCardSkeleton() {
  return <TaskSummaryCardInner />;
}

function TaskSummaryCardInner({ task }: { task?: TaskPreview }) {
  const buttonClasses = "max-md:flex-1 max-md:justify-center";

  return (
    <EntityCard>
      {!task ? (
        <EntitySummaryInfoSkeleton />
      ) : (
        <EntitySummaryInfo>
          <EntitySummaryTitle>{task?.title}</EntitySummaryTitle>
          <EntitySummaryText>{task?.description}</EntitySummaryText>
        </EntitySummaryInfo>
      )}

      {!task ? <Skeleton className="h-px" /> : <Divider />}

      <div className="flex gap-4">
        {!task ? (
          <>
            <Skeleton
              className={twMerge("h-8 rounded-lg md:w-[5.5rem]", buttonClasses)}
            />
          </>
        ) : (
          <>
            <Button
              variant="contrast"
              label="Delete task"
              className={buttonClasses}
            />
          </>
        )}
      </div>
    </EntityCard>
  );
}
