import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItemMobileSkeleton } from "../ProjectGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/projects/ProjectGridItemMobileSkeleton",
  component: ProjectGridItemMobileSkeleton,
  decorators: [withThemedBackground],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof ProjectGridItemMobileSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
