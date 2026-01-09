import { fn } from "storybook/internal/test";
import { UserListItem } from "./UserListItem";
import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof UserListItem> = {
  title: "Components/users/UserListItem",
  component: UserListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: "user1",
    fullName: "John Doe",
    email: "user1@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+380990000001",
    publicLink: "https://example.com/user1",
    position: {
      name: "Developer",
    },
    deleteAction: fn(),
  },
} satisfies Story;

export const WithoutImagePositionPhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    position: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
  },
} satisfies Story;
