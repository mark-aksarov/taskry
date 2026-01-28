import { CommentItem } from "./CommentItem";
import { fn } from "storybook/internal/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withCommentFormProvider } from "../withCommentFormProvider";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CommentItemActionMenuTrigger } from "./CommentItemActionMenuTrigger";

const meta = {
  title: "Components/comments/CommentItem",
  component: CommentItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px] max-w-full">
        <Story />
      </div>
    ),
    withCommentFormProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const content =
  "I’ve been following this project for a while now, and I must say the recent updates are quite impressive. The new user interface feels smoother and much more intuitive compared to the earlier versions. However, I did notice a few small glitches when resizing the window on mobile devices. Would love to see this fixed in the next patch!";

export const Default = {
  args: {
    content,
    createdAt: new Date(2025, 10, 10, 14, 23, 0),
    sender: {
      id: "user_1",
      fullName: "Alice Johnson",
      imageUrl: "/woman.jpg",
    },
    attachments: [],
    menuTrigger: (
      <CommentItemActionMenuTrigger
        guestMode={false}
        commentId={1}
        commentContent={content}
        deleteAction={fn()}
        mutate={fn()}
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
