import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskListItemSkeleton } from "./TaskListItemSkeleton";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/tasks/TaskListItemSkeleton",
  component: TaskListItemSkeleton,
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof TaskListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
