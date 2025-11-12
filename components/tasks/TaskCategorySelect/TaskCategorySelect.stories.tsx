import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategorySelect } from "./TaskCategorySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskCategorySelect",
  component: TaskCategorySelect,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskCategorySelect>;

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
