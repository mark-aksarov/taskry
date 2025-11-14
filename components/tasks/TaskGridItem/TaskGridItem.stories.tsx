import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItem } from "./TaskGridItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetail, TaskDetailContainerProvider } from "../TaskDetail";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedTaskCommentsContainer } from "../TaskCommentsModalTrigger/TaskCommentsModalTrigger.stories";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";

const meta = {
  title: "Components/tasks/TaskGridItem",
  component: TaskGridItem,
  tags: ["autodocs"],
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
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskGridItem>;

export default meta;
type Story = StoryObj<typeof TaskGridItem>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    assignee: {
      id: "user1",
      imageUrl: "/man.jpg",
      fullName: "John Doe",
    },
    status: {
      id: "pending",
      name: "Pending",
    },
    comments: 99,
    subtasks: 6,
    subtasksDone: 2,
  },
} satisfies Story;

export const WithoutAssignee = {
  args: {
    ...Default.args,
    assignee: undefined,
  },
} satisfies Story;

export const WithoutAssigneeImage = {
  args: {
    ...Default.args,
    assignee: {
      ...Default.args.assignee,
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: {
      id: "active",
      name: "Active",
    },
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: {
      id: "completed",
      name: "Completed",
    },
  },
} satisfies Story;
