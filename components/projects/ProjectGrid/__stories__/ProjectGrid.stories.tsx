import { ProjectGrid } from "../ProjectGrid";
import { ProjectGridItem } from "../../ProjectGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjects } from "../../ProjectList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectGridItemStory } from "../../ProjectGridItem/__stories__";
import { withDeleteProjectModalProvider } from "../../DeleteProjectModal/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";

const meta = {
  title: "components/projects/ProjectGrid",
  component: ProjectGrid,
  decorators: [
    withEntityPaginationProvider,
    withSelectedProjectsProvider,
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
        {mockedProjects.map((project) => (
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
