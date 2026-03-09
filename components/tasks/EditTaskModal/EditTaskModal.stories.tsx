import { useEffect } from "react";
import { EditTaskForm } from "../EditTaskForm";
import { EditTaskModal } from "./EditTaskModal";
import { Button } from "@/components/ui/Button";
import { useUpdateTask } from "../UpdateTaskContext";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { editTaskFormArgs } from "../EditTaskForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskProvider } from "../UpdateTaskContext/__stories__";

const meta = {
  title: "components/tasks/EditTaskModal",
  component: EditTaskModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdateTask();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button label="Edit task" onClick={() => onModalOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUpdateTaskProvider,
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
