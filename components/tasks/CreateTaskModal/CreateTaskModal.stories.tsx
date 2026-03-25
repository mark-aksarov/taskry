import { useEffect } from "react";
import { CreateTaskForm } from "../CreateTaskForm";
import { CreateTaskModal } from "./CreateTaskModal";
import { Button } from "@/components/ui/Button";
import { mockedUserSummaries } from "@/mocks/users";
import { useCreateTask } from "../CreateTaskContext";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateTaskProvider } from "../CreateTaskContext/__stories__";

const meta = {
  title: "components/tasks/CreateTaskModal",
  component: CreateTaskModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useCreateTask();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button label="New task" onClick={() => onModalOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateTaskProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CreateTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createTaskFormContainer: (
      <CreateTaskForm
        categorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    createTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;
