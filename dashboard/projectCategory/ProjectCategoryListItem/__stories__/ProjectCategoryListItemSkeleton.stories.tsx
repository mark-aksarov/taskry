import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryListItemSkeleton } from "../ProjectCategoryListItemSkeleton";

const meta = {
  title: "dashboard/project-categories/ProjectCategoryListItemSkeleton",
  component: ProjectCategoryListItemSkeleton,
} satisfies Meta<typeof ProjectCategoryListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
