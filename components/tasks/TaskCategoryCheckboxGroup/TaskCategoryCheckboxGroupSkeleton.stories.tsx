import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoryCheckboxGroupSkeleton } from "./TaskCategoryCheckboxGroupSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/tasks/TaskCategoryCheckboxGroupSkeleton",
  component: TaskCategoryCheckboxGroupSkeleton,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant({ variant: "alt" }), withContainerWidth()],
} satisfies Meta<typeof TaskCategoryCheckboxGroupSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
