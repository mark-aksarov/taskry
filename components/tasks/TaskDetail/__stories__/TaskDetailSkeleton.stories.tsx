import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailSkeleton } from "../TaskDetailSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskDetailSkeleton",
  component: TaskDetailSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
