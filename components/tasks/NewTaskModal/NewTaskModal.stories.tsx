import { NewTaskForm } from "../NewTaskForm";
import { NewTaskModal } from "./NewTaskModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewTaskFormStory } from "../NewTaskForm/NewTaskForm.stories";

const meta = {
  title: "Components/tasks/NewTaskModal",
  component: NewTaskModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New task" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskFormContainer: <NewTaskForm {...NewTaskFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;
