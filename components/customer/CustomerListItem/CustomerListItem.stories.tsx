import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerListItem } from "./CustomerListItem";
import { Meta, StoryObj } from "@storybook/react";

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
  },
} satisfies Story;

export const WithoutImagePhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: null,
    phoneNumber: null,
    publicLink: null,
  },
} satisfies Story;
