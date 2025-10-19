import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { TaskList } from "@/components/tasks/TaskList";
import { getTasks } from "@/lib/queries/task";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProjectActionsMenuTrigger } from "@/components/projects/ProjectActionsMenuTrigger";
import { ProfilePageTabs } from "@/components/profile/ProfilePageTabs";

export default async function ProfileTasksPage() {
  const tasks = await getTasks("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  if (!tasks.length) {
    return (
      <PageGrid>
        <ToolbarDesktop>
          <ProfilePageTabs />
        </ToolbarDesktop>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Tasks</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <ToolbarMobileBottom>
          <ProfilePageTabs />
        </ToolbarMobileBottom>
        <Centered>
          <EmptySection>
            <EmptySectionHeading>No tasks yet</EmptySectionHeading>
            <EmptySectionDescription>
              Create a new task to keep track of your work
            </EmptySectionDescription>
            <EmptySectionLink href="#">New Task</EmptySectionLink>
          </EmptySection>
        </Centered>
      </PageGrid>
    );
  }

  return (
    <PageGrid>
      <ToolbarDesktop>
        <ProfilePageTabs />
        <ProjectActionsMenuTrigger />
      </ToolbarDesktop>

      <ToolbarMobileTop>
        <ToolbarMobileHeading>Tasks</ToolbarMobileHeading>
        <ProjectActionsMenuTrigger />
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <ProfilePageTabs />
      </ToolbarMobileBottom>
      <TaskList tasks={tasks} />
    </PageGrid>
  );
}
