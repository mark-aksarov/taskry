import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentModalTrigger } from "./CommentModalTrigger";
import { mocked } from "storybook/internal/test";
import { getCommentWithReplies } from "@/lib/queries/comments";
import { commentWithRepliesMock } from "@/lib/data/__mocks__/comments";

const meta = {
  title: "Components/comments/CommentModalTrigger",
  component: CommentModalTrigger,
  tags: ["autodocs"],
  args: {
    commentId: 1,
  },
  beforeEach: () => {
    mocked(getCommentWithReplies).mockReturnValue(
      new Promise((res) => res(commentWithRepliesMock)),
    );
  },
} satisfies Meta<typeof CommentModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
  args: {
    fullscreen: true,
  },
};
