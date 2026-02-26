import { GridItem, GridItemRow } from "@/components/common/Grid";

interface ProjectGridItemLayoutProps {
  checkboxSlot?: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
  mainSlot: React.ReactNode;
  creatorImageSlot: React.ReactNode;
  commentsSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  progressSlot: React.ReactNode;
}

export function ProjectGridItemLayout({
  checkboxSlot,
  menuTriggerSlot,
  mainSlot,
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
        {mainSlot}
        {creatorImageSlot}
      </GridItemRow>

      <GridItemRow className="gap-2">
        {commentsSlot}
        {statusSlot}
      </GridItemRow>

      {progressSlot}
    </GridItem>
  );
}
