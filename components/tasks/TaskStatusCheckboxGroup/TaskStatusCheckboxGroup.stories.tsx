import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskStatusCheckboxGroup } from "./TaskStatusCheckboxGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskStatusCheckboxGroup",
  component: TaskStatusCheckboxGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskStatusCheckboxGroup>;

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
