import { GridItem, GridItemRow } from "@/components/common/GridItem";

export interface TaskGridItemProps {
  className?: string;
  checkboxSlot?: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  assigneeImageSlot: React.ReactNode;
  commentsSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  progressSlot: React.ReactNode;
}

export function TaskGridItemLayout({
  className,
  checkboxSlot,
  menuTriggerSlot,
  titleSlot,
  assigneeImageSlot,
  commentsSlot,
  statusSlot,
  progressSlot,
}: TaskGridItemProps) {
  return (
    <GridItem className={className}>
      <GridItemRow>
        {checkboxSlot}
        {menuTriggerSlot}
      </GridItemRow>
      <GridItemRow>
        {titleSlot}
        {assigneeImageSlot}
      </GridItemRow>

      <GridItemRow className="gap-2">
        {commentsSlot}
        {statusSlot}
      </GridItemRow>

      {progressSlot}
    </GridItem>
  );
}
