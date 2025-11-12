import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoryCheckboxGroupSkeleton } from "./TaskCategoryCheckboxGroupSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskCategoryCheckboxGroupSkeleton",
  component: TaskCategoryCheckboxGroupSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskCategoryCheckboxGroupSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
