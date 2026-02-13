import React from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCommentModal } from "./DeleteCommentModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/comments/DeleteCommentModal",
  component: DeleteCommentModal,
  decorators: [withToastRegion, withThemedBackground],
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
