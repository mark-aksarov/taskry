import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { useChangePasswordModal } from "../ChangePasswordModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withChangePasswordModalProvider } from "./withChangePasswordModalProvider";
import { withChangePasswordProvider } from "../../ChangePasswordProvider/__stories__";

const meta = {
  title: "components/users/ChangePasswordModal",
  component: ChangePasswordModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useChangePasswordModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withChangePasswordProvider,
    withChangePasswordModalProvider,
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
