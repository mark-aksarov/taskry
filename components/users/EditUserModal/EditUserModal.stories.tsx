import { useEffect } from "react";
import { EditUserForm } from "../EditUserForm";
import { EditUserModal } from "./EditUserModal";
import { Button } from "@/components/ui/Button";
import { useUpdateUser } from "../UpdateUserContext";
import { EditUserFormSkeleton } from "../EditUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { editUserFormArgs } from "../EditUserForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserProvider } from "../UpdateUserContext/__stories__";

const meta = {
  title: "components/users/EditUserModal",
  component: EditUserModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdateUser();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button label="Edit user" onClick={() => onModalOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUpdateUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof EditUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editUserFormContainer: <EditUserForm {...editUserFormArgs} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    editUserFormContainer: <EditUserFormSkeleton />,
  },
} satisfies Story;
