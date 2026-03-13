import { useEffect } from "react";
import { EditTaskForm } from "../EditTaskForm";
import { EditTaskModal } from "./EditTaskModal";
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
    editTaskFormContainer: (
      <EditTaskForm
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
    editTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;
