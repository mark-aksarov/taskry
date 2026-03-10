import { CommentItem } from "../CommentItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withCommentFormProvider } from "../../CommentForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSendCommentProvider } from "../../SendCommentContext/__stories__";
import { withUpdateCommentProvider } from "../../UpdateCommentContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const meta = {
  title: "components/comments/CommentItem",
  component: CommentItem,
  decorators: [
    withUpdateCommentProvider,
    withSendCommentProvider,
    withCommentFormProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
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
    deleteComment: () => ({ status: "success" }),
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

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
