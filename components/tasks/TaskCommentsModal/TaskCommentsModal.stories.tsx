import { fn } from "storybook/test";
import { Repeat } from "@/components/common/Repeat";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModal } from "./TaskCommentsModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";

const meta = {
  title: "Components/tasks/TaskCommentsModal",
  component: TaskCommentsModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Task comments" />
        <Story />
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
  args: {
    taskId: 1,
  },
} satisfies Meta<typeof TaskCommentsModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    sendCommentAction: fn(),
  },
} satisfies Story;

export const Empty = {
  ...Default,
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          TaskCommentsContainer: () => <CommentsEmptySection />,
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;

export const WithSkeletonContent = {
  ...Default,
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          TaskCommentsContainer: () => (
            <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
          ),
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
