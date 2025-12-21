import { fn } from "storybook/internal/test";
import { TaskGridItem } from "./TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTasksSelectionProvider } from "../TasksSelectionContext/decorators";
import { withUserDetail } from "@/components/users/UserDetailClientContainer/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";

const meta = {
  title: "Components/tasks/TaskGridItem",
  component: TaskGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[300px] max-md:w-full">
        <Story />
      </div>
    ),
    withTasksSelectionProvider,
    withTaskDetailCompact,
    withTaskComments,
    withUserDetail,
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
    status: "pending",
    commentsCount: 99,
    subtasksTotal: 6,
    subtasksDone: 2,
    deleteAction: fn(),
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
    status: "active",
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: "completed",
  },
} satisfies Story;
