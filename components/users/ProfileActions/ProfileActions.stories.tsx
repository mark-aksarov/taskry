import { EditUserForm } from "../EditUserForm";
import { ProfileActions } from "../ProfileActions";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordForm } from "../ChangePasswordForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as EditUserFormStory } from "../EditUserForm/EditUserForm.stories";
import { Default as ChangePasswordFormStory } from "../ChangePasswordForm/ChangePasswordForm.stories";

const meta = {
  title: "components/users/ProfileActions",
  component: ProfileActions,
  tags: ["autodocs"],
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
