import { UserDetail } from "../../UserDetail";
import { UserGridItem } from "../UserGridItem";
import { mockedUserDetail } from "@/mocks/users";
import { EditUserForm } from "../../EditUserForm";
import type { Meta, StoryObj } from "@storybook/react";
import { editUserFormArgs } from "../../EditUserForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserModalProvider } from "../../DeleteUserModal/__stories__";

const meta = {
  title: "components/users/UserGridItem",
  component: UserGridItem,
  decorators: [withDeleteUserModalProvider, withThemedBackground],
  render: (args) => <UserGridItem {...args} />,
} satisfies Meta<typeof UserGridItem>;

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
