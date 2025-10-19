import { CommentList } from "@/components/comments/CommentList";
import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { TaskCommentsMessageInput } from "@/components/tasks/TaskCommentsMessageInput";
import { TaskPageTabs } from "@/components/tasks/TaskPageTabs";
import { getCommentsByTask } from "@/lib/queries/comments";

export default async function TaskCommentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const comments = await getCommentsByTask(
    +id,
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  );

  if (!comments.length) {
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
        <Centered>
          <EmptySection>
            <EmptySectionHeading>No comments yet</EmptySectionHeading>
            <EmptySectionDescription>
              Start the conversation by adding your first comment
            </EmptySectionDescription>
            <EmptySectionLink href="#">Add Comment</EmptySectionLink>
          </EmptySection>
        </Centered>
      </PageGrid>
    );
  }

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
        <TaskCommentsMessageInput />
        <CommentList comments={comments} />
      </div>
    </PageGrid>
  );
}
