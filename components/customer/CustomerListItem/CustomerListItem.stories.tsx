import { fn } from "storybook/test";
import { CustomerListItem } from "./CustomerListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";

const meta = {
  title: "Components/customers/CustomerListItem",
  component: CustomerListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  render: (args) => (
    <CustomerListItem {...args} menuTrigger={renderMenu(args)} />
  ),
} satisfies Meta<typeof CustomerListItem>;

export default meta;
type Story = StoryObj<typeof CustomerListItem>;

const renderMenu = (args: any) => (
  <CustomerItemActionMenuTrigger
    customerId={args.id}
    customerFullName={args.fullName}
    deleteAction={fn()}
  />
);

export const Default = {
  args: {
    id: 1,
    fullName: "Alice Johnson",
    imageUrl: "/woman.jpg",
    email: "alice.johnson@example.com",
    phoneNumber: "+1-202-555-0147",
    publicLink: "https://company.com/customers/alice",
    company: {
      id: 1,
      name: "TechCorp",
    },
  },
} satisfies Story;

export const WithoutImagePhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
  },
} satisfies Story;
