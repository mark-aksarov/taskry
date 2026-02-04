import { EditTaskForm } from "../EditTaskForm";
import { EditTaskModal } from "./EditTaskModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as EditTaskFormStory } from "../EditTaskForm/EditTaskForm.stories";

const meta = {
  title: "Components/tasks/EditTaskModal",
  component: EditTaskModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Edit task" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof EditTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editTaskFormContainer: <EditTaskForm {...EditTaskFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    editTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;
