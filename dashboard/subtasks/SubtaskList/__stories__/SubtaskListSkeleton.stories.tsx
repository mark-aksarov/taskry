import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskListSkeleton } from "../SubtaskList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/subtasks/SubtaskListSkeleton",
  component: SubtaskListSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtaskListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
