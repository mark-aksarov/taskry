import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItemLargeSkeleton } from "../ProjectGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectGridItemLargeSkeleton",
  component: ProjectGridItemLargeSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectGridItemLargeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
