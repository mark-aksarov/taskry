import { useEffect } from "react";
import { NewTaskForm } from "../NewTaskForm";
import { NewTaskModal } from "./NewTaskModal";
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
  title: "components/tasks/NewTaskModal",
  component: NewTaskModal,
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
} satisfies Meta<typeof NewTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskFormContainer: (
      <NewTaskForm
        categorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;
