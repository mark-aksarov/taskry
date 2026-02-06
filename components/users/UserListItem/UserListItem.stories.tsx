import { fn } from "storybook/test";
import { UserListItem } from "./UserListItem";
import { EditUserForm } from "../EditUserForm";
import { UserDetailModal } from "../UserDetailModal";
import type { Meta, StoryObj } from "@storybook/react";
import { UserDetailBottomSheet } from "../UserDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";
import { Default as EditUserFormStory } from "../EditUserForm/EditUserForm.stories";
import { Default as UserDetailModalStory } from "../UserDetailModal/UserDetailModal.stories";
import { Default as UserDetailBottomSheetStory } from "../UserDetailBottomSheet/UserDetailBottomSheet.stories";

const meta = {
  title: "Components/users/UserListItem",
  component: UserListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  render: (args) => (
    <UserListItem
      {...args}
      menuTrigger={
        <UserItemActionMenuTrigger
          showDeleteMenuItem
          guestMode={false}
          editUserFormContainer={<EditUserForm {...EditUserFormStory.args} />}
          userId={args.id}
          userFullName={args.fullName}
          deleteAction={fn()}
        />
      }
      userDetailModal={<UserDetailModal {...UserDetailModalStory.args} />}
      userDetailBottomSheet={
        <UserDetailBottomSheet {...UserDetailBottomSheetStory.args} />
      }
    />
  ),
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof UserListItem>;

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
