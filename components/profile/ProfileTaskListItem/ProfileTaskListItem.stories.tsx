import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTaskListItem } from "./ProfileTaskListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskDetail } from "@/components/tasks/TaskDetailClientContainer/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";
import { withUpdateSubtasksForm } from "@/components/subtasks/UpdateSubtasksForm/decorators";

const meta = {
  title: "components/profile/ProfileTaskListItem",
  component: ProfileTaskListItem,
  tags: ["autodocs"],
  decorators: [
    withTaskDetail,
    withTaskComments,
    withUpdateSubtasksForm,
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
