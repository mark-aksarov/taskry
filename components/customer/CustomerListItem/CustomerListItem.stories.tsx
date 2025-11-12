import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { CustomerListItem } from "./CustomerListItem";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CustomerListItem> = {
  title: "Components/customers/CustomerListItem",
  component: CustomerListItem,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof CustomerListItem>;

export default meta;
type Story = StoryObj<typeof CustomerListItem>;

export const Default = {
  args: {
    customer: {
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
  },
} satisfies Story;

export const WithoutImagePhoneAndLink = {
  args: {
    customer: {
      ...Default.args.customer,
      imageUrl: null,
      phoneNumber: null,
      publicLink: null,
    },
  },
} satisfies Story;

export const Skeleton = {
  args: {
    customer: undefined,
  },
} satisfies Story;
