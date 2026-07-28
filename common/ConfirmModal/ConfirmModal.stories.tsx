import { useState } from "react";
import { Button } from "@/ui/Button";
import { ConfirmModal } from "./ConfirmModal";
import { DialogHeading } from "@/ui/Dialog";
import { ConfirmModalText } from "./ConfirmModalText";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ConfirmModalActions } from "./ConfirmModalActions";
import { ConfirmModalCancelButton } from "./ConfirmModalCancelButton";
import { ConfirmModalConfirmButton } from "./ConfirmModalConfirmButton";

const meta = {
  title: "dashboard/common/ConfirmModal",
  component: ConfirmModal,
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <Button variant="accent" onPress={() => setIsOpen(true)} label="Open" />
        <ConfirmModal {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
      </>
    );
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
    children: (
      <>
        <DialogHeading>Delete item</DialogHeading>

        <ConfirmModalText>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </ConfirmModalText>

        <ConfirmModalActions>
          <ConfirmModalCancelButton label="Cancel" />
          <ConfirmModalConfirmButton
            label="Delete"
            onConfirm={() => {}}
            data-test="confirm-button"
          />
        </ConfirmModalActions>
      </>
    ),
  },
} satisfies Story;
