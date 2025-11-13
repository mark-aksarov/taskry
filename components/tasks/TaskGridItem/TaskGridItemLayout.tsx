import { GridItem, GridItemRow } from "@/components/common/Grid";

export interface TaskGridItemProps {
  checkboxSlot?: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  assigneeImageSlot: React.ReactNode;
  commentsSlot: React.ReactNode;
  subtasksSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  progressSlot: React.ReactNode;
}

export function TaskGridItemLayout({
  checkboxSlot,
  menuTriggerSlot,
  titleSlot,
  assigneeImageSlot,
  commentsSlot,
  subtasksSlot,
  statusSlot,
  progressSlot,
}: TaskGridItemProps) {
  return (
    <GridItem>
      <GridItemRow>
        {checkboxSlot}
        {menuTriggerSlot}
      </GridItemRow>
      <GridItemRow>
        {titleSlot}
        {assigneeImageSlot}
      </GridItemRow>

      <GridItemRow className="gap-2">
        <div className="flex gap-2">
          {commentsSlot}
          {subtasksSlot}
        </div>
        {statusSlot}
      </GridItemRow>

      {progressSlot}
    </GridItem>
  );
}
