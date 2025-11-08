import { CommentItem } from "./CommentItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  withContainerWidth,
  withBackgroundVariant,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/comments/CommentItem",
  component: CommentItem,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof CommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    comment: {
      id: 1,
      content:
        "I’ve been following this project for a while now, and I must say the recent updates are quite impressive. The new user interface feels smoother and much more intuitive compared to the earlier versions. However, I did notice a few small glitches when resizing the window on mobile devices. Would love to see this fixed in the next patch!",
      createdAt: new Date(2025, 10, 10, 14, 23, 0),
      sender: {
        id: "user_1",
        fullName: "Alice Johnson",
        imageUrl: "/woman.jpg",
      },
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
      likes: [
        {
          userId: "user_1",
        },
      ],
      _count: {
        likes: 13,
      },
    },
  },
};

export const Skeleton: Story = {
  args: {
    comment: undefined,
  },
};
