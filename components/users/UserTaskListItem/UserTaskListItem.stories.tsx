import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserTaskListItem } from "./UserTaskListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";

const meta = {
  title: "components/users/UserTaskListItem",
  component: UserTaskListItem,
  tags: ["autodocs"],
  decorators: [withTaskDetailCompact, withTaskComments, withThemedBackground],
} satisfies Meta<typeof UserTaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    comments: 10,
    status: "pending",
  },
} satisfies Story;
