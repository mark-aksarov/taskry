import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskListItemSkeleton } from "./TaskListItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskListItemSkeleton",
  component: TaskListItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
