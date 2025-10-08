import {
  GridItem,
  gridItemActionMenuItemStyles,
  GridItemEllipsisWrapper,
  GridItemImageContainer,
  GridItemInfo,
  GridItemProgress,
  GridItemText,
  GridItemTitle,
  GridItemTop,
  GridItemInfoSkeleton,
  GridItemImageContainerSkeleton,
  GridItemActionMenuDialogHeader,
  GridItemActionMenuSkeleton,
  GridItemProgressSkeleton,
  GridItemLink,
} from "@/components/common/Grid";

import { Item } from "react-stately";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

import { TaskPreview } from "@/lib/queries/types";
import { useMemo } from "react";
import { Button, Link, Checkbox } from "@/components/ui";
import Image from "next/image";

export function TaskGridItem({ task }: { task?: TaskPreview }) {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!task?.deadline) return "";
    return new Date(task.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [task?.deadline, locale]);

  const progressValue = useMemo(() => {
    if (!task || task.subtasks.length === 0) return 0;
    const subtasksDone = task.subtasks.filter((s) => s.isDone).length;
    return (subtasksDone / task.subtasks.length) * 100;
  }, [task]);

  return (
    <GridItem>
      {/* --- Checkbox & Menu --- */}
      <GridItemTop>
        {!task ? (
          <GridItemActionMenuSkeleton />
        ) : (
          <>
            <Checkbox aria-label={task.title} />
            <ResponsiveMenuTrigger
              placement="bottom right"
              renderDialogHeader={() => <GridItemActionMenuDialogHeader />}
              renderButton={() => (
                <Button
                  aria-label="project menu"
                  variant="ghost"
                  iconLeft={
                    <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  }
                  className="-mr-2 rounded-full"
                />
              )}
            >
              <Item textValue="Delete" key="delete">
                <div className={gridItemActionMenuItemStyles}>
                  <Trash size={16} /> Delete
                </div>
              </Item>
              <Item textValue="Mark as Pending" key="pending">
                <div className={gridItemActionMenuItemStyles}>
                  <CircleEllipsis size={16} /> Mark as Pending
                </div>
              </Item>
              <Item textValue="Mark as Done" key="done">
                <div className={gridItemActionMenuItemStyles}>
                  <Check size={16} />
                  Mark as Done
                </div>
              </Item>
              <Item textValue="Mark as Active" key="active">
                <div className={gridItemActionMenuItemStyles}>
                  <Clock size={16} />
                  Mark as Active
                </div>
              </Item>
            </ResponsiveMenuTrigger>
          </>
        )}
      </GridItemTop>
      <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-4">
        {/* --- Task Details --- */}
        {!task ? (
          <GridItemInfoSkeleton className="max-sm:w-full max-sm:items-center" />
        ) : (
          <GridItemInfo className="max-sm:w-full max-sm:items-center sm:flex-1">
            <GridItemEllipsisWrapper>
              <GridItemTitle>
                <GridItemLink href={`/tasks/${task.id}`}>
                  {task.title}
                </GridItemLink>
              </GridItemTitle>
            </GridItemEllipsisWrapper>
            <GridItemEllipsisWrapper>
              <GridItemText>{`Deadline on ${formattedDeadline}`}</GridItemText>
            </GridItemEllipsisWrapper>
          </GridItemInfo>
        )}

        {/* --- Creator Image --- */}
        {!task ? (
          <GridItemImageContainerSkeleton />
        ) : task.creator?.imageUrl ? (
          <Link href={`/users/${task.creator.id}`}>
            <GridItemImageContainer>
              <Image fill src={task.creator.imageUrl} alt={task.creator.name} />
            </GridItemImageContainer>
          </Link>
        ) : (
          <GridItemImageContainer />
        )}
      </div>

      {/* --- Progress --- */}
      {!task ? (
        <GridItemProgressSkeleton />
      ) : (
        <GridItemProgress
          value={progressValue}
          showValueText={false}
          aria-label="task progress"
        />
      )}
    </GridItem>
  );
}
