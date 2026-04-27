import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCommentModal } from "../DeleteCommentModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withCommentFormProvider } from "../CommentForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCommentProvider } from "../DeleteCommentProvider/__stories__";

const meta = {
  title: "dashboard/comments/DeleteCommentModal",
  component: DeleteCommentModal,
  decorators: [
    withOpenModal,
    withToastRegion,
    withDeleteCommentProvider,
    withCommentFormProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteComment",
  },
} satisfies Meta<typeof DeleteCommentModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    commentId: 1,
  },
} satisfies Story;
