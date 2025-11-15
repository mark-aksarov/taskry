import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailModal } from "./TaskDetailModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  TaskDetail,
  TaskDetailContainerProvider,
  TaskDetailSkeleton,
} from "../TaskDetail";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedCommentsContainer } from "@/components/comments/CommentsContainer";

const meta = {
  title: "components/tasks/TaskDetailModal",
  component: TaskDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Task detail" />
        <Story />
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
  args: {
    taskId: 1,
  },
} satisfies Meta<typeof TaskDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  decorators: [
    (Story) => (
      <TaskDetailContainerProvider
        TaskDetailContainer={() => <TaskDetail {...TaskDetailStory.args} />}
      >
        <CommentsContainerProvider
          CommentsContainer={() => <MockedCommentsContainer />}
        >
          <Story />
        </CommentsContainerProvider>
      </TaskDetailContainerProvider>
    ),
  ],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <TaskDetailContainerProvider
        TaskDetailContainer={() => <TaskDetailSkeleton />}
      >
        <Story />
      </TaskDetailContainerProvider>
    ),
  ],
} satisfies Story;
