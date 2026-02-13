import { Meta, StoryObj } from "@storybook/react";
import { withCommentFormProvider } from "../../withCommentFormProvider";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CommentItemActionMenuTrigger } from "../CommentItemActionMenuTrigger";

const meta = {
  title: "components/comments/CommentItemActionMenuTrigger",
  component: CommentItemActionMenuTrigger,
  decorators: [withCommentFormProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentItemActionMenuTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    commentId: 1,
    commentContent: "Comment content",
    deleteAction: () => ({ status: "success" }),
    mutate: () => {},
  },
} satisfies Story;
