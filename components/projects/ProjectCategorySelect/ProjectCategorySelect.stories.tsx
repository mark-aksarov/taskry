import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategorySelect } from "./ProjectCategorySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/customers/ProjectCategorySelect",
  component: ProjectCategorySelect,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategorySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    categories: [
      {
        id: 1,
        name: "UI Design",
      },
      {
        id: 2,
        name: "Wireframing",
      },
      {
        id: 3,
        name: "Frontend Development",
      },
      {
        id: 4,
        name: "Backend Development",
      },
      {
        id: 5,
        name: "Testing & QA",
      },
    ],
  },
} satisfies Story;
