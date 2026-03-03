import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/ChangePasswordModal",
  component: ChangePasswordModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Change password" />
          <Story />
        </DialogTrigger>
      );
    },
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
