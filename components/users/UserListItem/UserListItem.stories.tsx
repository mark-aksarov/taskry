import { withBackgroundVariant } from "@/.storybook/decorators";
import { UserListItem } from "./UserListItem";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserListItem> = {
  title: "Components/users/UserListItem",
  component: UserListItem,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof UserListItem>;

export const Default = {
  args: {
    user: {
      id: "user1",
      fullName: "John Doe",
      email: "user1@example.com",
      imageUrl: "/man.jpg",
      phoneNumber: "+380990000001",
      publicLink: "https://example.com/user1",
      position: {
        name: "Developer",
      },
    },
  },
} satisfies Story;

export const WithoutImagePositionPhoneAndLink = {
  args: {
    user: {
      ...Default.args.user,
      imageUrl: null,
      position: null,
      phoneNumber: null,
      publicLink: null,
    },
  },
} satisfies Story;

export const Skeleton = {
  args: {
    user: undefined,
  },
} satisfies Story;
