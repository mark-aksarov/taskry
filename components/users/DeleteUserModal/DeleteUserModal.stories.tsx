import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteUserModal } from "../DeleteUserModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/DeleteUserModal",
  component: DeleteUserModal,
  decorators: [withThemedBackground],
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button label="Delete user" onClick={() => setOpen(true)} />
        <DeleteUserModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteUserModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    userFullName: "User 1",
    isOpen: true,
    onOpenChange: () => {},
    deleteUser: () => ({ status: "success" }),
  },
} satisfies Story;
