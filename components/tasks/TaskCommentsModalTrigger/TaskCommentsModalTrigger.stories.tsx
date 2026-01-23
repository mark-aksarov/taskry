import { fn } from "storybook/internal/test";
import { Repeat } from "@/components/common/Repeat";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModalTrigger } from "./TaskCommentsModalTrigger";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";

const meta = {
  title: "Components/tasks/TaskCommentsModalTrigger",
  component: TaskCommentsModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskCommentsModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
    commentsCount: 10,
    taskCommentsContainer: <MockedCommentsContainer />,
    sendCommentAction: fn(),
    updateCommentAction: fn(),
  },
} satisfies Story;

export const WithEmptyContent = {
  args: {
    taskId: 1,
    commentsCount: 0,
    taskCommentsContainer: (
      <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
    ),
    sendCommentAction: fn(),
    updateCommentAction: fn(),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    taskId: 1,
    commentsCount: 10,
    taskCommentsContainer: <CommentsEmptySection />,
    sendCommentAction: fn(),
    updateCommentAction: fn(),
  },
} satisfies Story;
