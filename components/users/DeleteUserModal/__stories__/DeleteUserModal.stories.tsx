import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { DeleteUserModal } from "../DeleteUserModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useDeleteUserModal } from "../DeleteUserModalContext";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserModalProvider } from "./withDeleteUserModalProvider";
import { withDeleteUserProvider } from "../../DeleteUserProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/users/DeleteUserModal",
  component: DeleteUserModal,
  decorators: [
    withDeleteUserModalProvider,
    withToastRegion,
    withDeleteUserProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
  render: (args) => {
    const { onOpenChange } = useDeleteUserModal();

    useEffect(() => onOpenChange(true), [onOpenChange]);

    return (
      <>
        <Button label="Open modal" onClick={() => onOpenChange(true)} />
        <DeleteUserModal {...args} />
      </>
    );
  },
} satisfies Meta<typeof DeleteUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    userFullName: "Fake User",
  },
} satisfies Story;
