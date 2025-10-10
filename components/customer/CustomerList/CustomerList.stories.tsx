import { Meta, StoryObj } from "@storybook/react";
import { CustomerList } from "./CustomerList";
import { customersMock } from "../customersMock";

const meta: Meta<typeof CustomerList> = {
  title: "Components/customers/CustomerList",
  component: CustomerList,
  tags: ["autodocs"],
  args: {
    customers: customersMock,
  },
} satisfies Meta<typeof CustomerList>;

export default meta;
type Story = StoryObj<typeof CustomerList>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
