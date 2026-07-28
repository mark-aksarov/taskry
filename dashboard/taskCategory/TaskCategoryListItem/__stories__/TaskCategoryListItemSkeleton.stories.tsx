import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoryListItemSkeleton } from "../TaskCategoryListItemSkeleton";

const meta = {
  title: "dashboard/task-categories/TaskCategoryListItemSkeleton",
  component: TaskCategoryListItemSkeleton,
} satisfies Meta<typeof TaskCategoryListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
