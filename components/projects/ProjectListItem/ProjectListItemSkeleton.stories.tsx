import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectListItemSkeleton } from "./ProjectListItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/projects/ProjectListItemSkeleton",
  component: ProjectListItemSkeleton,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Skeleton = {} satisfies Story;
