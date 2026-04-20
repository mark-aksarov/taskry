import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryListItemSkeleton } from "../ProjectCategoryListItemSkeleton";

const meta = {
  title: "dashboard/project-categories/ProjectCategoryListItemSkeleton",
  component: ProjectCategoryListItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategoryListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
