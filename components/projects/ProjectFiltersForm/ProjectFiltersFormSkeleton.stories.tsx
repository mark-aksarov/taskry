import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersFormSkeleton } from "./ProjectFiltersFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/ProjectFiltersFormSkeleton",
  component: ProjectFiltersFormSkeleton,
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} as Meta<typeof ProjectFiltersFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
