import { useState } from "react";
import { NewTaskForm } from "../NewTaskForm";
import { NewTaskModal } from "./NewTaskModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { newTaskFormArgs } from "../NewTaskForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/NewTaskModal",
  component: NewTaskModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="New task" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof NewTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskFormContainer: <NewTaskForm {...newTaskFormArgs} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;
