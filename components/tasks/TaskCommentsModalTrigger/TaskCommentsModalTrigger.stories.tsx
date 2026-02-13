import { Repeat } from "@/components/common/Repeat";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskCommentsModalTrigger } from "./TaskCommentsModalTrigger";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCommentsModalStory } from "../TaskCommentsModal/__stories__";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";

const meta = {
  title: "components/tasks/TaskCommentsModalTrigger",
  component: TaskCommentsModalTrigger,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskCommentsModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    commentsCount: 10,
    modal: (
      <TaskCommentsModal
        {...TaskCommentsModalStory.args}
        taskCommentsContainer={<MockedCommentsContainer />}
      />
    ),
  },
} satisfies Story;

export const WithEmptyContent = {
  args: {
    commentsCount: 10,
    modal: (
      <TaskCommentsModal
        {...TaskCommentsModalStory.args}
        taskCommentsContainer={
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
      <TaskCommentsModal
        {...TaskCommentsModalStory.args}
        taskCommentsContainer={<CommentsEmptySection />}
      />
    ),
  },
} satisfies Story;
