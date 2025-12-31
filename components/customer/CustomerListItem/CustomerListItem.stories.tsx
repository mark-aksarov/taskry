import { fn } from "storybook/test";
import { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem } from "./CustomerListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof CustomerListItem> = {
  title: "Components/customers/CustomerListItem",
  component: CustomerListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerListItem>;

export default meta;
type Story = StoryObj<typeof CustomerListItem>;

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
    deleteAction: fn(),
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
