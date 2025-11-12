import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerCheckboxGroupSkeleton } from "./CustomerCheckboxGroupSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/customers/CustomerCheckboxGroupSkeleton",
  component: CustomerCheckboxGroupSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof CustomerCheckboxGroupSkeleton>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};
