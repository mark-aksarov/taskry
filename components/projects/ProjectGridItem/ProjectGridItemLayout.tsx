import { GridItem, GridItemRow } from "@/components/common/Grid";

interface ProjectGridItemLayoutProps {
  checkboxSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  creatorImageSlot: React.ReactNode;
  messagesSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  progressSlot: React.ReactNode;
}

export function ProjectGridItemLayout({
  checkboxSlot,
  menuTriggerSlot,
  titleSlot,
  creatorImageSlot,
  messagesSlot,
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
        {messagesSlot}
        {statusSlot}
      </GridItemRow>

      {progressSlot}
    </GridItem>
  );
}
