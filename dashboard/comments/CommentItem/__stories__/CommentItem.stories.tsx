import { CommentItem } from "../CommentItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withCommentFormProvider } from "../../CommentForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSendCommentProvider } from "../../SendCommentProvider/__stories__";
import { withUpdateCommentProvider } from "../../UpdateCommentProvider/__stories__";
import { withDeleteCommentProvider } from "../../DeleteCommentProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/comments/CommentItem",
  component: CommentItem,
  decorators: [
    withDeleteCommentProvider,
    withUpdateCommentProvider,
    withSendCommentProvider,
    withCommentFormProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = "Comment content text";

export const Default = {
  args: {
    id: 1,
    content,
    createdAt: "2025-01-01T04:00:00Z",
    sender: {
      id: "user-1",
      fullName: "User 1",
      imageUrl: "/woman.jpg",
    },
    canEdit: true,
  },
} satisfies Story;

export const WithoutSender = {
  args: {
    ...Default.args,
    sender: undefined,
  },
} satisfies Story;

export const WithoutSenderImage = {
  args: {
    ...Default.args,
    sender: {
      ...Default.args.sender,
      imageUrl: undefined,
    },
  },
} satisfies Story;
