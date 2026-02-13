import { CommentItem } from "../CommentItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentItemActionMenuTriggerStory } from "./index";
import { withCommentFormProvider } from "../../withCommentFormProvider";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CommentItemActionMenuTrigger } from "../CommentItemActionMenuTrigger";

const meta = {
  title: "components/comments/CommentItem",
  component: CommentItem,
  decorators: [withCommentFormProvider, withThemedBackground],
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
    createdAt: new Date(2025, 10, 10, 14, 23, 0),
    sender: {
      id: "user-1",
      fullName: "User 1",
      imageUrl: "/woman.jpg",
    },
    attachments: [],
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

export const WithAttachements = {
  args: {
    ...Default.args,
    attachments: [
      {
        id: 1,
        fileUrl: "/placeholder.jpg",
      },
      {
        id: 2,
        fileUrl: "/placeholder.jpg",
      },
    ],
  },
} satisfies Story;
