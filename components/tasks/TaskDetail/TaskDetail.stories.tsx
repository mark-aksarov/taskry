import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetail } from "./TaskDetail";

const meta = {
  title: "components/tasks/TaskDetail",
  component: TaskDetail,
  tags: ["autodocs"],
  args: {
    taskId: 1,
  },
} satisfies Meta<typeof TaskDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
