import { fn } from "storybook/test";
import { TaskListItem } from "./TaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";

const meta = {
  title: "Components/tasks/TaskListItem",
  component: TaskListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  render: (args) => <TaskListItem {...args} menuTrigger={renderMenu(args)} />,
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof TaskListItem>;

const renderMenu = (args: any) => (
  <TaskItemActionMenuTrigger
    guestMode={true}
    taskId={args.id}
    taskTitle={args.title}
    taskStatus={args.status}
    projectStatus={args.project?.status}
    canDelete={true}
    canUpdate={true}
    canUpdateStatus={true}
    deleteAction={fn()}
    updateStatusAction={fn()}
  />
);

export const Default: Story = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    project: { id: 1, title: "Website Redesign", status: "active" },
    category: { id: 1, name: "Design" },
    status: "pending",
    assignee: { id: "user1", imageUrl: "/man.jpg", fullName: "John Doe" },
    commentsCount: 10,
  },
};

export const WithCheckbox: Story = {
  args: {
    ...Default.args,
    showCheckbox: true,
  },
};

export const WithoutAssignee: Story = {
  args: {
    ...Default.args,
    assignee: undefined,
  },
};

export const WithoutAssigneeImage: Story = {
  args: {
    ...Default.args,
    assignee: {
      id: "user1",
      fullName: "John Doe",
      imageUrl: undefined,
    },
  },
};

export const WithActiveStatus: Story = {
  args: {
    ...Default.args,
    status: "active",
  },
};

export const WithCompletedStatus: Story = {
  args: {
    ...Default.args,
    status: "completed",
  },
};
