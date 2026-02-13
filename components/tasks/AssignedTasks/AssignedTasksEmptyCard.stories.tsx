import { NewTaskForm } from "../NewTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewTaskFormStory } from "@/components/tasks/NewTaskForm/__stories__";

const meta = {
  title: "components/tasks/AssignedTasksEmptyCard",
  component: AssignedTasksEmptyCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof AssignedTasksEmptyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskFormContainer: <NewTaskForm {...NewTaskFormStory.args} />,
  },
} satisfies Story;
