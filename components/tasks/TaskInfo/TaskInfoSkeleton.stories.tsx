import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskInfoSkeleton } from "./TaskInfoSkeleton";

const meta = {
  title: "components/tasks/TaskInfoSkeleton",
  component: TaskInfoSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof TaskInfoSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
