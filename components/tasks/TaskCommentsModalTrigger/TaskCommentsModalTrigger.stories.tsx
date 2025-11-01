import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModalTrigger } from "./TaskCommentsModalTrigger";
import { mocked } from "storybook/internal/test";
import { getCommentWithReplies } from "@/lib/queries/comments";
import { commentWithRepliesMock } from "@/lib/data/__mocks__/comments";

const meta = {
  title: "Components/tasks/TaskCommentsModalTrigger",
  component: TaskCommentsModalTrigger,
  tags: ["autodocs"],
  args: {
    commentCount: 25,
    taskId: 1,
  },
  beforeEach: () => {
    mocked(getCommentWithReplies).mockReturnValue(
      new Promise((res) => res(commentWithRepliesMock)),
    );
  },
} satisfies Meta<typeof TaskCommentsModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};
