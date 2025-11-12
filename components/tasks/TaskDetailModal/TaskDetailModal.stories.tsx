import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailModal } from "./TaskDetailModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import {
  TaskDetail,
  TaskDetailContainerProvider,
  TaskDetailSkeleton,
} from "../TaskDetail";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedTaskCommentsContainer } from "../TaskCommentsModalTrigger/TaskCommentsModalTrigger.stories";

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
    withBackgroundVariant(),
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
          CommentsContainer={() => <MockedTaskCommentsContainer />}
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
