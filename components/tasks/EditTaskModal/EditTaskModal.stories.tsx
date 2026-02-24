import { useState } from "react";
import { EditTaskForm } from "../EditTaskForm";
import { EditTaskModal } from "./EditTaskModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { editTaskFormArgs } from "../EditTaskForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/EditTaskModal",
  component: EditTaskModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Edit task" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof EditTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editTaskFormContainer: <EditTaskForm {...editTaskFormArgs} />,
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    editTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;
