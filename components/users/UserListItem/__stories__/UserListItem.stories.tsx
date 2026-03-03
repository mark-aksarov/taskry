import { UserListItem } from "../UserListItem";
import { UserDetail } from "../../UserDetail";
import { mockedUserDetail } from "@/mocks/users";
import { EditUserForm } from "../../EditUserForm";
import type { Meta, StoryObj } from "@storybook/react";
import { editUserFormArgs } from "../../EditUserForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserListItem",
  component: UserListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedUserDetail,
    editUserFormContainer: <EditUserForm {...editUserFormArgs} />,
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    fullName: "This is a user name with a very long text for layout testing",
    email: "longemailaddressfortestingpurposes@exampledomainfortestemail.com",
    phoneNumber: "+1000000000000000000000000000000000000000000000000000",
    publicLink:
      "https://example.com/this-is-a-very-long-url-for-layout-testing",
  },
};

export const WithoutImagePositionPhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    position: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
  },
} satisfies Story;
