import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailSkeleton } from "./TaskDetailSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "components/tasks/TaskDetailSkeleton",
  component: TaskDetailSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof TaskDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
