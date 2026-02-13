import { Repeat } from "@/components/common/Repeat";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCommentsModalTrigger } from "./ProjectCommentsModalTrigger";
import { ProjectCommentsModalStory } from "../ProjectCommentsModal/__stories__";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

const meta = {
  title: "components/projects/ProjectCommentsModalTrigger",
  component: ProjectCommentsModalTrigger,
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
    modal: <ProjectCommentsModal {...ProjectCommentsModalStory.args} />,
  },
} satisfies Story;

export const WithEmptyContent = {
  args: {
    commentsCount: 10,
    modal: (
      <ProjectCommentsModal
        {...ProjectCommentsModalStory.args}
        projectCommentsContainer={
          <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
        }
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    commentsCount: 10,
    modal: (
      <ProjectCommentsModal
        {...ProjectCommentsModalStory.args}
        projectCommentsContainer={<CommentsEmptySection />}
      />
    ),
  },
} satisfies Story;
