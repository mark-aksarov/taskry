import { UserListItem } from "../UserListItem";
import { UserDetailModal } from "../../UserDetailModal";
import type { Meta, StoryObj } from "@storybook/react";
import { UserDetailModalStory } from "../../UserDetailModal/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserItemActionMenuTrigger } from "../../UserItemActionMenuTrigger";
import { withDeleteUserModalProvider } from "../../DeleteUserModal/__stories__";
import { UserItemActionMenuTriggerStory } from "../../UserItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/users/UserListItem",
  component: UserListItem,
  decorators: [withDeleteUserModalProvider, withThemedBackground],
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: "user1",
    fullName: "User 1",
    email: "user1@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+10000000001",
    publicLink: "https://example.com/user1",
    position: {
      name: "Position 1",
    },
    menuTrigger: (
      <UserItemActionMenuTrigger {...UserItemActionMenuTriggerStory.args} />
    ),
    userDetailModal: <UserDetailModal {...UserDetailModalStory.args} />,
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
