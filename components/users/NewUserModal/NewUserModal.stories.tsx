import { useEffect } from "react";
import { NewUserModal } from "./NewUserModal";
import { Button } from "@/components/ui/Button";
import { useCreateUser } from "../CreateUserContext";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateUserProvider } from "../CreateUserContext/__stories__";

const meta = {
  title: "components/users/NewUserModal",
  component: NewUserModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useCreateUser();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button label="New user" onClick={() => onModalOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof NewUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
