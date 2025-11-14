import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskFormSkeleton } from "./NewTaskFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/NewTaskFormSkeleton",
  component: NewTaskFormSkeleton,
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
} as Meta<typeof NewTaskFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
