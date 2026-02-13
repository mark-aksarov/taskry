import { NewTaskForm } from "../NewTaskForm";
import { NewTaskModal } from "./NewTaskModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskFormStory } from "../NewTaskForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/NewTaskModal",
  component: NewTaskModal,
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
