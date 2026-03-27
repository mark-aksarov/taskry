import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { CreateUserModal } from "../CreateUserModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useCreateUserModal } from "../CreateUserModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateUserModalProvider } from "./withCreateUserModalProvider";
import { withCreateUserProvider } from "../../CreateUserProvider/__stories__";

const meta = {
  title: "components/users/CreateUserModal",
  component: CreateUserModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCreateUserModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateUserProvider,
    withCreateUserModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CreateUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
