import { ProjectGrid } from "../ProjectGrid";
import { mockedProjectList } from "@/mocks/projects";
import { ProjectGridItem } from "../../ProjectGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectGridItemStory } from "../../ProjectGridItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteProjectModalProvider } from "../../DeleteProjectModal/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "components/projects/ProjectGrid",
  component: ProjectGrid,
  decorators: [
    withViewModeProvider,
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withDeleteCommentModalProvider,
    withUpdateProjectStatusesProvider,
    withDeleteProjectModalProvider,
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
          <ProjectGridItem
            key={project.id}
            {...ProjectGridItemStory.args}
            {...project}
          />
        ))}
      </>
    ),
  },
} satisfies Story;
