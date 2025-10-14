import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentList } from "./CommentList";
import { commentsMock } from "@/lib/data/__mocks__/comments";
import { CommentItem } from "../CommentItem";

const meta = {
  title: "components/comments/CommentList",
  component: CommentList,
  tags: ["autodocs"],
  args: {
    children: null,
  },
  render: (args) => (
    <CommentList {...args}>
      {commentsMock.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </CommentList>
  ),
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
