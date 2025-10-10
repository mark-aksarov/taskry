import { customersMock } from "../customersMock";
import { CustomerListItem } from "./CustomerListItem";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CustomerListItem> = {
  title: "Components/customers/CustomerListItem",
  component: CustomerListItem,
  tags: ["autodocs"],
  args: {
    customer: customersMock[0],
  },
} satisfies Meta<typeof CustomerListItem>;

export default meta;
type Story = StoryObj<typeof CustomerListItem>;

export const Default: Story = {};

export const Skeleton: Story = {
  args: {
    customer: undefined,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
