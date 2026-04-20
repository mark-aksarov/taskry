import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryListItemSkeleton } from "../TaskCategoryListItemSkeleton";

const meta = {
  title: "components/task-categories/TaskCategoryListItemSkeleton",
  component: TaskCategoryListItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
