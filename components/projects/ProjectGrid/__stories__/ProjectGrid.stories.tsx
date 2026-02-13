import { ProjectGrid } from "../ProjectGrid";
import { mockedProjects } from "../../ProjectList";
import { ProjectGridItem } from "../../ProjectGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectGridItemStory } from "../../ProjectGridItem/__stories__";

const meta = {
  title: "components/projects/ProjectGrid",
  component: ProjectGrid,
  decorators: [withThemedBackground],
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
