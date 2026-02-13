import type { Meta, StoryObj } from "@storybook/react";
import { CustomerSearchListItem } from "./CustomerSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/CustomerSearchListItem",
  component: CustomerSearchListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerSearchListItem>;

export default meta;
type Story = StoryObj<typeof CustomerSearchListItem>;

export const Default = {
  args: {
    id: 1,
    fullName: "Customer 1",
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
