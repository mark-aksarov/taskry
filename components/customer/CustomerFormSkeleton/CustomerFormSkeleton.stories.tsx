import { Meta, StoryObj } from "@storybook/react";
import { CustomerFormSkeleton } from "./CustomerFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/customers/CustomerFormSkeleton",
  component: CustomerFormSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerFormSkeleton>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
