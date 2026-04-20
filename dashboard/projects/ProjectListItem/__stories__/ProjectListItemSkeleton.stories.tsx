import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectListItemSkeleton } from "../ProjectListItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/projects/ProjectListItemSkeleton",
  component: ProjectListItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
