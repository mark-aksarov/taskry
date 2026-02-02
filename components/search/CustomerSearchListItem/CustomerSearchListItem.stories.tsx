import type { Meta, StoryObj } from "@storybook/react";
import { CustomerSearchListItem } from "./CustomerSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/search/CustomerSearchListItem",
  component: CustomerSearchListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerSearchListItem>;

export default meta;
type Story = StoryObj<typeof CustomerSearchListItem>;

export const Default = {
  args: {
    id: 1,
    fullName: "John Doe",
    email: "customer1@example.com",
    imageUrl: "/man.jpg",
  },
} satisfies Story;

export const WithoutImagePositionPhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
  },
} satisfies Story;
