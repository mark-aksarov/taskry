import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemLargeSkeleton } from "../TaskGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskGridItemLargeSkeleton",
  component: TaskGridItemLargeSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskGridItemLargeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
