import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { SubtaskActionsMenuTrigger } from "@/components/subtasks/SubtaskActionsMenuTrigger";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { getSubtasksByTask } from "@/lib/queries/task";

export async function TaskSubtasksMobile({ taskId }: { taskId: number }) {
  const subtasks = await getSubtasksByTask(taskId);

  if (!subtasks.length) {
    return (
      <PageContainer fullscreen centered className="md:hidden">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No subtasks yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Create a new subtask to keep track of your work
          </EmptySectionDescription>
          <EmptySectionLink href="#">New Subtask</EmptySectionLink>
        </EmptySection>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="md:hidden">
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Subtasks</ToolbarMobileHeading>
          <SubtaskActionsMenuTrigger />
        </ToolbarMobileTop>
        <SubtaskList subtasks={subtasks} />
      </PageGrid>
    </PageContainer>
  );
}
