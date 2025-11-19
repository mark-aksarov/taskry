import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskFormBaseSkeleton } from "./TaskFormBaseSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskFormBaseSkeleton",
  component: TaskFormBaseSkeleton,
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
} as Meta<typeof TaskFormBaseSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
