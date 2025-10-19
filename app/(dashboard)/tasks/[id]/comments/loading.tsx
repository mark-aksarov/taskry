import { Repeat } from "@/components/common/Repeat";
import {
  CommentItem,
  CommentItemCard,
} from "@/components/comments/CommentItem";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { TaskPageTabs } from "@/components/tasks/TaskPageTabs";

export default function Loading() {
  return (
    <PageGrid>
      <ToolbarDesktop>
        <TaskPageTabs />
      </ToolbarDesktop>

      <ToolbarMobileTop>
        <ToolbarMobileHeading>Comments</ToolbarMobileHeading>
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <TaskPageTabs />
      </ToolbarMobileBottom>

      <div className="flex flex-col gap-4">
        <Repeat
          items={10}
          renderItem={() => (
            <CommentItemCard>
              <CommentItem />
            </CommentItemCard>
          )}
        />
      </div>
    </PageGrid>
  );
}
