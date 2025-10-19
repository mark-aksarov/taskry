import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { getProjects } from "@/lib/queries/project";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectActionsMenuTrigger } from "@/components/projects/ProjectActionsMenuTrigger";
import { ProfilePageTabs } from "@/components/profile/ProfilePageTabs";

export default async function ProfileProjectsPage() {
  const projects = await getProjects("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  if (!projects.length) {
    return (
      <PageGrid>
        <ToolbarDesktop>
          <ProfilePageTabs />
        </ToolbarDesktop>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>Projects</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <ToolbarMobileBottom>
          <ProfilePageTabs />
        </ToolbarMobileBottom>
        <Centered>
          <EmptySection>
            <EmptySectionHeading>No projects yet</EmptySectionHeading>
            <EmptySectionDescription>
              Create a new project to keep track of your work
            </EmptySectionDescription>
            <EmptySectionLink href="#">New Project</EmptySectionLink>
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
        <ToolbarMobileHeading>Projects</ToolbarMobileHeading>
        <ProjectActionsMenuTrigger />
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <ProfilePageTabs />
      </ToolbarMobileBottom>
      <ProjectList projects={projects} />
    </PageGrid>
  );
}
