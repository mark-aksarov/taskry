import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectFiltersFormSkeleton } from "../ProjectFiltersFormSkeleton";

const meta = {
  title: "components/projects/ProjectFiltersFormSkeleton",
  component: ProjectFiltersFormSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} as Meta<typeof ProjectFiltersFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
