import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordForm } from "../ChangePasswordForm";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ChangePasswordFormStory } from "../ChangePasswordForm/__stories__";

const meta = {
  title: "components/users/ChangePasswordModal",
  component: ChangePasswordModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Change password" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof ChangePasswordModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    changePasswordForm: (
      <ChangePasswordForm {...ChangePasswordFormStory.args} />
    ),
  },
} satisfies Story;
