import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskFiltersFormSkeleton } from "./TaskFiltersFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskFiltersFormSkeleton",
  component: TaskFiltersFormSkeleton,
  tags: ["autodocs"],
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
} as Meta<typeof TaskFiltersFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
