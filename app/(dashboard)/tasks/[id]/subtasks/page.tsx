import { getSubtasksByTask } from "@/lib/queries/task";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
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
import { TaskPageTabs } from "@/components/tasks/TaskPageTabs";
import { SubtaskActionsMenuTrigger } from "@/components/subtasks/SubtaskActionsMenuTrigger";

export default async function TaskSubtasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subtasks = await getSubtasksByTask(+id);

  if (!subtasks.length) {
    return (
      <PageGrid>
        <ToolbarDesktop>
          <TaskPageTabs />
        </ToolbarDesktop>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Subtasks</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <ToolbarMobileBottom>
          <TaskPageTabs />
        </ToolbarMobileBottom>
        <Centered>
          <EmptySection>
            <EmptySectionHeading>No subtasks yet</EmptySectionHeading>
            <EmptySectionDescription>
              Create a subtask to break this task into smaller steps
            </EmptySectionDescription>
            <EmptySectionLink href="#">Add Subtask</EmptySectionLink>
          </EmptySection>
        </Centered>
      </PageGrid>
    );
  }

  return (
    <PageGrid>
      <ToolbarDesktop>
        <TaskPageTabs />
        <SubtaskActionsMenuTrigger />
      </ToolbarDesktop>
      <ToolbarMobileTop>
        <ToolbarMobileHeading>Subtasks</ToolbarMobileHeading>
        <SubtaskActionsMenuTrigger />
      </ToolbarMobileTop>
      <ToolbarMobileBottom>
        <TaskPageTabs />
      </ToolbarMobileBottom>
      <SubtaskList subtasks={subtasks} />
    </PageGrid>
  );
}
