import { EditUserForm } from "../../EditUserForm";
import { ProfileActions } from "../ProfileActions";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordForm } from "../../ChangePasswordForm";
import { EditUserFormStory } from "../../EditUserForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ChangePasswordFormStory } from "../../ChangePasswordForm/__stories__";

const meta = {
  title: "components/users/ProfileActions",
  component: ProfileActions,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProfileActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    changePasswordForm: (
      <ChangePasswordForm {...ChangePasswordFormStory.args} />
    ),
    editUserFormContainer: <EditUserForm {...EditUserFormStory.args} />,
  },
} satisfies Story;
