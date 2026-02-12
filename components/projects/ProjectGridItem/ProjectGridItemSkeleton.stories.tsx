import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItemSkeleton } from "./ProjectGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/projects/ProjectGridItemSkeleton",
  component: ProjectGridItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectGridItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
