import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemSkeleton } from "./TaskGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskGridItemSkeleton",
  component: TaskGridItemSkeleton,
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskGridItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
