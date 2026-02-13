import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemSkeleton } from "../TaskGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskGridItemSkeleton",
  component: TaskGridItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskGridItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
