import { CommentItem } from "../CommentItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentItemActionMenuTriggerStory } from "./index";
import { withCommentFormProvider } from "../../withCommentFormProvider";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CommentItemActionMenuTrigger } from "../CommentItemActionMenuTrigger";
import { withDeleteCommentModalProvider } from "../../DeleteCommentModal/__stories__";

const meta = {
  title: "components/comments/CommentItem",
  component: CommentItem,
  decorators: [
    withCommentFormProvider,
    withDeleteCommentModalProvider,
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
    content,
    createdAt: "2025-01-01T04:00:00Z",
    sender: {
      id: "user-1",
      fullName: "User 1",
      imageUrl: "/woman.jpg",
    },
    menuTrigger: (
      <CommentItemActionMenuTrigger
        {...CommentItemActionMenuTriggerStory.args}
        commentContent={content}
      />
    ),
  },
} satisfies Story;

export const WithoutSender = {
  args: {
    ...Default.args,
    sender: undefined,
  },
};

export const WithoutSenderImage = {
  args: {
    ...Default.args,
    sender: {
      ...Default.args.sender,
      imageUrl: undefined,
    },
  },
};
