import { fn } from "storybook/internal/test";
import { TaskGridItem } from "./TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

const meta = {
  title: "Components/tasks/TaskGridItem",
  component: TaskGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[300px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  render: (args) => <TaskGridItem {...args} menuTrigger={renderMenu(args)} />,
} satisfies Meta<typeof TaskGridItem>;

export default meta;
type Story = StoryObj<typeof TaskGridItem>;

const renderMenu = (args: any) => (
  <TaskItemActionMenuTrigger
    guestMode={false}
    taskId={args.id}
    taskTitle={args.title}
    taskStatus={args.status}
    projectStatus={args.projectStatus}
    canDelete
    canUpdate
    canUpdateStatus
    deleteAction={fn()}
    updateStatusAction={fn()}
    className="-mr-2"
  />
);

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
    status: TaskStatus.pending,
    projectStatus: ProjectStatus.active,
    commentsCount: 99,
    subtasksTotal: 6,
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
      id: "user3",
      fullName: "Olivia White",
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
