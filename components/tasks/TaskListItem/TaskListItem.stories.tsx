import { TaskListItem } from "./TaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskDetail } from "@/components/tasks/TaskDetail/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsContainer/decorators";
import { withUpdateSubtasksForm } from "@/components/subtasks/UpdateSubtasksForm/decorators";

const meta = {
  title: "Components/tasks/TaskListItem",
  component: TaskListItem,
  tags: ["autodocs"],
  decorators: [
    withTaskDetail,
    withTaskComments,
    withUpdateSubtasksForm,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    project: { id: 1, title: "Website Redesign" },
    category: { id: 1, name: "Design" },
    status: { id: "pending", name: "Pending" },
    assignee: { id: "user1", imageUrl: "/man.jpg", fullName: "John Doe" },
    comments: 10,
    subtasks: 6,
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    ...Default.args,
    showCheckbox: true,
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
