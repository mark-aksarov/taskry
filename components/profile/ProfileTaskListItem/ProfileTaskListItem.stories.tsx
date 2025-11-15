import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTaskListItem } from "./ProfileTaskListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  TaskDetail,
  TaskDetailContainerProvider,
} from "@/components/tasks/TaskDetail";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { Default as TaskDetailStory } from "@/components/tasks/TaskDetail/TaskDetail.stories";
import { MockedCommentsContainer } from "@/components/comments/CommentsContainer";

const meta = {
  title: "components/profile/ProfileTaskListItem",
  component: ProfileTaskListItem,
  tags: ["autodocs"],
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
    withThemedBackground,
  ],
} satisfies Meta<typeof ProfileTaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    comments: 10,
    subtasks: 6,
    status: { id: "pending", name: "Pending" },
  },
} satisfies Story;
