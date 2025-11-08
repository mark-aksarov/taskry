import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerCheckboxGroupSkeleton } from "./CustomerCheckboxGroupSkeleton";
import {
  withContainerWidth,
  withBackgroundVariant,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/customers/CustomerCheckboxGroupSkeleton",
  component: CustomerCheckboxGroupSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof CustomerCheckboxGroupSkeleton>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};
