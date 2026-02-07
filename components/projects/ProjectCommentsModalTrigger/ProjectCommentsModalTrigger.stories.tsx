import { fn } from "storybook/internal/test";
import { Repeat } from "@/components/common/Repeat";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectCommentsModalTrigger } from "./ProjectCommentsModalTrigger";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
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
    commentsCount: 10,
    modal: (
      <ProjectCommentsModal
        projectId={1}
        projectCommentsContainer={<MockedCommentsContainer />}
        sendCommentAction={fn()}
        updateCommentAction={fn()}
      />
    ),
  },
} satisfies Story;

export const WithEmptyContent = {
  args: {
    commentsCount: 10,
    modal: (
      <ProjectCommentsModal
        projectId={1}
        projectCommentsContainer={
          <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
        }
        sendCommentAction={fn()}
        updateCommentAction={fn()}
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    commentsCount: 10,
    modal: (
      <ProjectCommentsModal
        projectId={1}
        projectCommentsContainer={<CommentsEmptySection />}
        sendCommentAction={fn()}
        updateCommentAction={fn()}
      />
    ),
  },
} satisfies Story;
