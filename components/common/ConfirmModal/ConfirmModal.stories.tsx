import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { Button } from "@/components/ui/Button";
import { ConfirmModalText } from "./ConfirmModalText";
import { DialogHeading } from "@/components/ui/Dialog";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ConfirmModalActions } from "./ConfirmModalActions";
import { ConfirmModalCancelButton } from "./ConfirmModalCancelButton";
import { ConfirmModalConfirmButton } from "./ConfirmModalConfirmButton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/ConfirmModal",
  component: ConfirmModal,
  decorators: [withThemedBackground],
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <Button onPress={() => setIsOpen(true)} label="Open" />
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
