import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryCheckboxGroupSkeleton } from "./ProjectCategoryCheckboxGroupSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/projects/ProjectCategoryCheckboxGroupSkeleton",
  component: ProjectCategoryCheckboxGroupSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof ProjectCategoryCheckboxGroupSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
