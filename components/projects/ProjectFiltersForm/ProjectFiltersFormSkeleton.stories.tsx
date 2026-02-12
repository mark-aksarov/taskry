import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersFormSkeleton } from "./ProjectFiltersFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

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
