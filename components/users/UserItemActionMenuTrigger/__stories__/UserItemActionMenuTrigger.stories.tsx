import { EditUserForm } from "../../EditUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditUserFormStory } from "../../EditUserForm/__stories__";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserModalProvider } from "../../DeleteUserModal/__stories__";

const meta = {
  title: "components/users/UserItemActionMenuTrigger",
  component: UserItemActionMenuTrigger,
  decorators: [withDeleteUserModalProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserItemActionMenuTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    showDeleteMenuItem: true,
    guestMode: false,
    editUserFormContainer: <EditUserForm {...EditUserFormStory.args} />,
    userId: "user-1",
    userFullName: "User 1",
  },
} satisfies Story;
