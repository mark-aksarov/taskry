import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItemLargeSkeleton } from "../ProjectGridItemSkeleton";

const meta = {
  title: "dashboard/projects/ProjectGridItemLargeSkeleton",
  component: ProjectGridItemLargeSkeleton,
} satisfies Meta<typeof ProjectGridItemLargeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
