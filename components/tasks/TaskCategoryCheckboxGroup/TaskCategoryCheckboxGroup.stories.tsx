import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoryCheckboxGroup } from "./TaskCategoryCheckboxGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskCategoryCheckboxGroup",
  component: TaskCategoryCheckboxGroup,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskCategoryCheckboxGroup>;

export default meta;
export type Story = StoryObj<typeof meta>;

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
