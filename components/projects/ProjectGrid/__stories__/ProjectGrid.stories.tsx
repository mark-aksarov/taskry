import { ProjectGrid } from "../ProjectGrid";
import { mockedProjectList } from "@/mocks/projects";
import { ProjectGridItem } from "../../ProjectGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectItemProviders } from "../../ProjectItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectGridItemStory } from "../../ProjectGridItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsContext/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesContext/__stories__";

const meta = {
  title: "components/projects/ProjectGrid",
  component: ProjectGrid,
  decorators: [
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withViewModeProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        {mockedProjectList.map((project) => (
          <ProjectItemProviders
            key={project.id}
            projectId={project.id}
            projectStatus={project.status}
            updateProject={() => ({ status: "success" })}
            deleteProject={() => ({ status: "success" })}
            updateProjectStatus={() => ({ status: "success" })}
          >
            <ProjectGridItem
              key={project.id}
              {...ProjectGridItemStory.args}
              {...project}
            />
          </ProjectItemProviders>
        ))}
      </>
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
