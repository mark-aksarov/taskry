import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCheckboxGroupSkeleton } from "./ProjectCheckboxGroupSkeleton";
import {
  withContainerWidth,
  withBackgroundVariant,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/projects/ProjectCheckboxGroupSkeleton",
  component: ProjectCheckboxGroupSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof ProjectCheckboxGroupSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
