import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskListSkeleton } from "../SubtaskList";

const meta = {
  title: "dashboard/subtasks/SubtaskListSkeleton",
  component: SubtaskListSkeleton,
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtaskListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
