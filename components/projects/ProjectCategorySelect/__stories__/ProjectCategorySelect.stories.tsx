import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategorySelect } from "../ProjectCategorySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectCategorySelect",
  component: ProjectCategorySelect,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectCategorySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    categories: [
      {
        id: 1,
        name: "Project Category 1",
      },
      {
        id: 2,
        name: "Project Category 2",
      },
      {
        id: 3,
        name: "Project Category 3",
      },
      {
        id: 4,
        name: "Project Category 4",
      },
      {
        id: 5,
        name: "Project Category 5",
      },
    ],
  },
} satisfies Story;
