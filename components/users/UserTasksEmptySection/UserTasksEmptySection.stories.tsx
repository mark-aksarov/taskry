import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTasksEmptySection } from "./UserTasksEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewTaskFormStory } from "@/components/tasks/NewTaskForm/NewTaskForm.stories";

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
    newTaskFormContainer: <NewTaskForm {...NewTaskFormStory.args} />,
  },
} satisfies Story;
