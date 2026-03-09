import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { useChangePassword } from "../ChangePasswordContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withChangePasswordProvider } from "../ChangePasswordContext/__stories__";
import { useEffect } from "react";

const meta = {
  title: "components/users/ChangePasswordModal",
  component: ChangePasswordModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useChangePassword();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="Change password"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withChangePasswordProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ChangePasswordModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
  },
} satisfies Story;
