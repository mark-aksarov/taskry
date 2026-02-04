import React from "react";
import { Button } from "@/components/ui/Button";
import { ToastRegion } from "@/components/ui/Toast";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCommentModal } from "./DeleteCommentModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/comments/DeleteCommentModal",
  component: DeleteCommentModal,
  decorators: [
    (Story) => (
      <>
        <ToastRegion />
        <Story />
      </>
    ),
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button label="Delete comment" onClick={() => setOpen(true)} />
        <DeleteCommentModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteCommentModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    commentId: 1,
    isOpen: false,
    onOpenChange: () => {},
    deleteAction: () => ({ status: "success" }),
    mutate: () => {},
  },
} satisfies Story;

export const WithError = {
  args: {
    commentId: 1,
    isOpen: false,
    onOpenChange: () => {},
    deleteAction: () => ({ status: "error", errorCode: "validationError" }),
    mutate: () => {},
  },
} satisfies Story;
