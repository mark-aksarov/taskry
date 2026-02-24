import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTasksEmptySection } from "./UserTasksEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { newTaskFormArgs } from "@/components/tasks/NewTaskForm/__stories__";

const meta = {
  title: "components/users/UserTasksEmptySection",
  component: UserTasksEmptySection,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
    layout: "centered",
  },
} satisfies Meta<typeof UserTasksEmptySection>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskFormContainer: <NewTaskForm {...newTaskFormArgs} />,
  },
} satisfies Story;
