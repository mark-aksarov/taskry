import { GridItem, GridItemRow } from "@/components/common/Grid";

interface ProjectGridItemLayoutProps {
  checkboxSlot?: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  creatorImageSlot: React.ReactNode;
  commentsSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  progressSlot: React.ReactNode;
}

export function ProjectGridItemLayout({
  checkboxSlot,
  menuTriggerSlot,
  titleSlot,
  creatorImageSlot,
  commentsSlot,
  statusSlot,
  progressSlot,
}: ProjectGridItemLayoutProps) {
  return (
    <GridItem>
      <GridItemRow>
        {checkboxSlot}
        {menuTriggerSlot}
      </GridItemRow>
      <GridItemRow>
        {titleSlot}
        {creatorImageSlot}
      </GridItemRow>

      <GridItemRow>
        {commentsSlot}
        {statusSlot}
      </GridItemRow>

      {progressSlot}
    </GridItem>
  );
}
