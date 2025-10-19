import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { Skeleton } from "@/components/ui";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { PageGrid } from "@/components/common/PageGrid";
import { TaskPageTabs } from "@/components/tasks/TaskPageTabs";
import { AttachmentListItem } from "@/components/attachments/AttachmentListItem";

export default function Loading() {
  return (
    <PageGrid>
      <ToolbarDesktop>
        <TaskPageTabs />
        <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
      </ToolbarDesktop>

      <ToolbarMobileTop>
        <ToolbarMobileHeading>Attachments</ToolbarMobileHeading>
        <Skeleton className="h-8 w-8 rounded-lg" />
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <TaskPageTabs />
      </ToolbarMobileBottom>

      <List>
        <Repeat items={10} renderItem={() => <AttachmentListItem />} />
      </List>
    </PageGrid>
  );
}
