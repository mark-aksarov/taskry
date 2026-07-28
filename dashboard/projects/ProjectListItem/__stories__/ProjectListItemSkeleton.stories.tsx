import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectListItemSkeleton } from "../ProjectListItemSkeleton";

const meta = {
  title: "dashboard/projects/ProjectListItemSkeleton",
  component: ProjectListItemSkeleton,
} satisfies Meta<typeof ProjectListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
