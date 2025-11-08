import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryCheckboxGroupSkeleton } from "./ProjectCategoryCheckboxGroupSkeleton";
import {
  withContainerWidth,
  withBackgroundVariant,
} from "@/.storybook/decorators";

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
