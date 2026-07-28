import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskListItemSkeleton } from "../TaskListItemSkeleton";

const meta = {
  title: "dashboard/tasks/TaskListItemSkeleton",
  component: TaskListItemSkeleton,
} satisfies Meta<typeof TaskListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    showCheckbox: false,
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    showCheckbox: true,
  },
} satisfies Story;
