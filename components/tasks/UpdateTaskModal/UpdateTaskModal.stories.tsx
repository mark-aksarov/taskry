import { useEffect } from "react";
import { UpdateTaskForm } from "../UpdateTaskForm";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { Button } from "@/components/ui/Button";
import { mockedUserSummaries } from "@/mocks/users";
import { useUpdateTask } from "../UpdateTaskContext";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskDetail as mockedTask } from "@/mocks/tasks";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskProvider } from "../UpdateTaskContext/__stories__";

const meta = {
  title: "components/tasks/UpdateTaskModal",
  component: UpdateTaskModal,
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
} satisfies Meta<typeof UpdateTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateTaskFormContainer: (
      <UpdateTaskForm
        {...mockedTask}
        taskId={mockedTask.id}
        taskCategorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    updateTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;
