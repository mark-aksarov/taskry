import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCommentsModalTrigger } from "./TaskCommentsModalTrigger";
import {
  CommentsContainerProvider,
  MockedCommentsContainer,
} from "@/components/comments/CommentsContainer";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { Repeat } from "@/components/common/Repeat";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

const meta = {
  title: "Components/tasks/TaskCommentsModalTrigger",
  component: TaskCommentsModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
  excludeStories: ["MockedCommentsContainer"],
  args: {
    commentCount: 25,
    taskId: 1,
  },
} satisfies Meta<typeof TaskCommentsModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  decorators: [
    (Story) => (
      <CommentsContainerProvider
        CommentsContainer={() => <MockedCommentsContainer />}
      >
        <Story />
      </CommentsContainerProvider>
    ),
  ],
} satisfies Story;

export const Empty = {
  decorators: [
    (Story) => (
      <CommentsContainerProvider
        CommentsContainer={() => <CommentsEmptySection />}
      >
        <Story />
      </CommentsContainerProvider>
    ),
  ],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <CommentsContainerProvider
        CommentsContainer={() => (
          <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
        )}
      >
        <Story />
      </CommentsContainerProvider>
    ),
  ],
} satisfies Story;
