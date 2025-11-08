import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserCheckboxGroupSkeleton } from "./UserCheckboxGroupSkeleton";
import {
  withContainerWidth,
  withBackgroundVariant,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/users/UserCheckboxGroupSkeleton",
  component: UserCheckboxGroupSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof UserCheckboxGroupSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
