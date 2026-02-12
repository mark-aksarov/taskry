import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailAltSkeleton } from "./TaskDetailAltSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskDetailAltSkeleton",
  component: TaskDetailAltSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskDetailAltSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
