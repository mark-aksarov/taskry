import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { getTasks } from "@/lib/queries/task";
import { ProfileTaskList } from "../ProfileTaskList";

export async function ProfileTasksMobile() {
  const tasks = await getTasks("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  if (!tasks.length) {
    return (
      <PageContainer fullscreen centered className="md:hidden">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
            No assigned tasks yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Create a new task to keep track of your work
          </EmptySectionDescription>
          <EmptySectionButton href="#">New Task</EmptySectionButton>
        </EmptySection>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="md:hidden">
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Assigned tasks</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <ProfileTaskList />
      </PageGrid>
    </PageContainer>
  );
}
