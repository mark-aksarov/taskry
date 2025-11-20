import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailFullSkeleton } from "./TaskDetailFullSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskDetailFullSkeleton",
  component: TaskDetailFullSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskDetailFullSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
