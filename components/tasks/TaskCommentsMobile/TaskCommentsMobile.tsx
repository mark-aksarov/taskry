import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { CommentList } from "@/components/comments/CommentList";
import { getCommentsByTask } from "@/lib/queries/comments";
import { TaskCommentsMessageInputMobile } from "../TaskCommentsMessageInputMobile";

export async function TaskCommentsMobile({ taskId }: { taskId: number }) {
  const comments = await getCommentsByTask(
    taskId,
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  );

  if (!comments.length) {
    return (
      <PageContainer fullscreen className="md:hidden">
        <PageGrid className="flex-auto">
          <ToolbarMobileTop>
            <ToolbarMobileHeading>Task comments</ToolbarMobileHeading>
          </ToolbarMobileTop>
          <TaskCommentsMessageInputMobile />
          <EmptySection className="flex-auto items-center justify-center">
            <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
              No comments yet
            </EmptySectionHeading>
            <EmptySectionDescription>
              Start the conversation by adding your first comment
            </EmptySectionDescription>
          </EmptySection>
        </PageGrid>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="md:hidden">
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Task comments</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <TaskCommentsMessageInputMobile />
        <CommentList comments={comments} />
      </PageGrid>
    </PageContainer>
  );
}
