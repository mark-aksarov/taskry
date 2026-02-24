import { NewTaskForm } from "../NewTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { newTaskFormArgs } from "../NewTaskForm/__stories__";
import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/AssignedTasksEmptyCard",
  component: AssignedTasksEmptyCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof AssignedTasksEmptyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskFormContainer: <NewTaskForm {...newTaskFormArgs} />,
  },
} satisfies Story;
