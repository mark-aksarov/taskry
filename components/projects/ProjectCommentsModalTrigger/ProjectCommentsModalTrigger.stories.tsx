import { fn } from "storybook/internal/test";
import { Repeat } from "@/components/common/Repeat";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCommentsModalTrigger } from "./ProjectCommentsModalTrigger";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";

const meta = {
  title: "Components/projects/ProjectCommentsModalTrigger",
  component: ProjectCommentsModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectCommentsModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: 1,
    commentsCount: 10,
    projectCommentsContainer: <MockedCommentsContainer />,
    sendCommentAction: fn(),
    updateCommentAction: fn(),
  },
} satisfies Story;

export const WithEmptyContent = {
  args: {
    projectId: 1,
    commentsCount: 0,
    projectCommentsContainer: (
      <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
    ),
    sendCommentAction: fn(),
    updateCommentAction: fn(),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    projectId: 1,
    commentsCount: 10,
    projectCommentsContainer: <CommentsEmptySection />,
    sendCommentAction: fn(),
    updateCommentAction: fn(),
  },
} satisfies Story;
