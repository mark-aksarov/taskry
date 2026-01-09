import { fn } from "storybook/test";
import { UserListItem } from "./UserListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";

const meta = {
  title: "Components/users/UserListItem",
  component: UserListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  render: (args) => <UserListItem {...args} menuTrigger={renderMenu(args)} />,
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof UserListItem>;

const renderMenu = (args: any) => (
  <UserItemActionMenuTrigger
    userId={args.id}
    userFullName={args.fullName}
    deleteAction={fn()}
  />
);

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
