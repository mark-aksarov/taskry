import type { Meta, StoryObj } from "@storybook/react";
import { UserSearchListItem } from "./UserSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/search/UserSearchListItem",
  component: UserSearchListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserSearchListItem>;

export default meta;
type Story = StoryObj<typeof UserSearchListItem>;

export const Default = {
  args: {
    id: "user1",
    fullName: "John Doe",
    email: "user1@example.com",
    imageUrl: "/man.jpg",
  },
} satisfies Story;

export const WithoutImagePositionPhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
  },
} satisfies Story;
