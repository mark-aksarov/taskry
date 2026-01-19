import { fn } from "storybook/test";
import { TaskListItem } from "./TaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";

const meta = {
  title: "Components/tasks/TaskListItem",
  component: TaskListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  render: (args) => (
    <TaskListItem
      {...args}
      commentModalTrigger={
        <TaskCommentsModalTrigger
          taskId={1}
          commentsCount={10}
          sendCommentAction={fn()}
        />
      }
      menuTrigger={
        <TaskItemActionMenuTrigger
          guestMode={false}
          taskId={args.id}
          taskTitle={args.title}
          taskStatus={args.status}
          deleteAction={fn()}
          updateStatusAction={fn()}
        />
      }
    />
  ),
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof TaskListItem>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    project: { id: 1, title: "Website Redesign" },
    category: { id: 1, name: "Design" },
    status: "pending",
    assignee: { id: "user1", imageUrl: "/man.jpg", fullName: "John Doe" },
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
      id: "user1",
      fullName: "John Doe",
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
