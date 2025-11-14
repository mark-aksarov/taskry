import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskStatusSelect } from "./TaskStatusSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskStatusSelect",
  component: TaskStatusSelect,
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
} satisfies Meta<typeof TaskStatusSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    statuses: [
      { id: "pending", name: "Pending" },
      { id: "active", name: "Active" },
      { id: "completed", name: "Completed" },
    ],
  },
} satisfies Story;
