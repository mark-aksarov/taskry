import { fn } from "storybook/test";
import { UserTaskListItem } from "./UserTaskListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";

const meta = {
  title: "Components/users/UserTaskListItem",
  component: UserTaskListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  render: (args) => (
    <UserTaskListItem
      {...args}
      commentModalTrigger={
        <TaskCommentsModalTrigger
          taskId={args.id}
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
          projectStatus={args.projectStatus}
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={fn()}
          updateStatusAction={fn()}
        />
      }
    />
  ),
} satisfies Meta<typeof UserTaskListItem>;

export default meta;
type Story = StoryObj<typeof UserTaskListItem>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    status: TaskStatus.pending,
    projectStatus: ProjectStatus.active,
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
