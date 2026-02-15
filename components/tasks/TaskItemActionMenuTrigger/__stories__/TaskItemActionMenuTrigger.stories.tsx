import { Meta, StoryObj } from "@storybook/react";
import { EditTaskForm } from "../../EditTaskForm";
import { TaskStatus } from "@/generated/prisma/enums";
import { EditTaskFormStory } from "../../EditTaskForm/__stories__";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskItemActionMenuTrigger",
  component: TaskItemActionMenuTrigger,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskItemActionMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    guestMode: false,
    taskId: 1,
    taskTitle: "Task 1",
    taskStatus: TaskStatus.active,
    deleteAction: () => ({ status: "success" }),
    editTaskFormContainer: <EditTaskForm {...EditTaskFormStory.args} />,
  },
};
