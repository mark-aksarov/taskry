import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteCommentModal } from "../DeleteCommentModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCommentModalProvider } from "./withDeleteCommentModalProvider";

const meta = {
  title: "components/comments/DeleteCommentModal",
  component: DeleteCommentModal,
  decorators: [
    withToastRegion,
    withDeleteCommentModalProvider,
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button label="Delete comment" onClick={() => setOpen(true)} />
        <DeleteCommentModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteCommentModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    commentId: 1,
    isOpen: false,
    onOpenChange: () => {},
    deleteComment: () => ({ status: "success" }),
    mutate: () => {},
  },
} satisfies Story;
