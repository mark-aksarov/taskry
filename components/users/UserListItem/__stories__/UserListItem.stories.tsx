import { UserListItem } from "../UserListItem";
import { UserDetail } from "../../UserDetail";
import { mockedUserDetail } from "@/mocks/users";
import { EditUserForm } from "../../EditUserForm";
import type { Meta, StoryObj } from "@storybook/react";
import { editUserFormArgs } from "../../EditUserForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserModalProvider } from "../../DeleteUserModal/__stories__";

const meta = {
  title: "components/users/UserListItem",
  component: UserListItem,
  decorators: [withDeleteUserModalProvider, withThemedBackground],
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedUserDetail,
    guestMode: false,
    showUserActionMenuTrigger: true,
    showDeleteMenuItem: true,
    editUserFormContainer: <EditUserForm {...editUserFormArgs} />,
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
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
