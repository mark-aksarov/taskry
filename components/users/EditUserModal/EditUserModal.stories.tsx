import { useState } from "react";
import { EditUserForm } from "../EditUserForm";
import { EditUserModal } from "./EditUserModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { EditUserFormSkeleton } from "../EditUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { editUserFormArgs } from "../EditUserForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/EditUserModal",
  component: EditUserModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Edit user" />
          <Story />
        </DialogTrigger>
      );
    },
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
