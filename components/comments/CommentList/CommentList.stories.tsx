import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentList } from "./CommentList";
import {
  commentsMock,
  commentWithRepliesMock,
} from "@/lib/data/__mocks__/comments";
import { mocked } from "storybook/test";
import { getCommentWithReplies } from "@/lib/queries/comments";

const meta = {
  title: "components/comments/CommentList",
  component: CommentList,
  tags: ["autodocs"],
  args: {
    comments: commentsMock,
  },
  beforeEach: () => {
    mocked(getCommentWithReplies).mockReturnValue(
      new Promise((res) => res(commentWithRepliesMock)),
    );
  },
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
