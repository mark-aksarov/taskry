import { NewTaskForm } from "../NewTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";

const meta = {
  title: "Components/tasks/AssignedTasksEmptyCard",
  component: AssignedTasksEmptyCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof AssignedTasksEmptyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskFormContainer: <NewTaskForm {...TaskFormBaseStory.args} />,
  },
} satisfies Story;
