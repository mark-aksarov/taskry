import { Repeat } from "@/components/common/Repeat";
import { List } from "@/components/common/List";
import { SubtaskListItem } from "@/components/subtasks/SubtaskListItem";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { Skeleton } from "@/components/ui";
import { TaskPageTabs } from "@/components/tasks/TaskPageTabs";

export default function Loading() {
  return (
    <PageGrid>
      <ToolbarDesktop>
        <TaskPageTabs />
        <Skeleton className="h-8 w-[5.5rem] rounded-lg" />
      </ToolbarDesktop>

      <ToolbarMobileTop>
        <ToolbarMobileHeading>Subtasks</ToolbarMobileHeading>
        <Skeleton className="h-8 w-8 rounded-lg" />
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <TaskPageTabs />
      </ToolbarMobileBottom>

      <List>
        <Repeat items={10} renderItem={() => <SubtaskListItem />} />
      </List>
    </PageGrid>
  );
}
