import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteCommentModal } from "../DeleteCommentModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withCommentFormProvider } from "../CommentForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCommentProvider } from "../DeleteCommentContext/__stories__";

const meta = {
  title: "components/comments/DeleteCommentModal",
  component: DeleteCommentModal,
  decorators: [
    withToastRegion,
    withDeleteCommentProvider,
    withCommentFormProvider,
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = useState(true);

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
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
