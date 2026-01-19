import { fn } from "storybook/test";
import { TaskStatus } from "@/generated/prisma/enums";
import { UserTaskListItem } from "./UserTaskListItem";
import type { Meta, StoryObj } from "@storybook/react";
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
