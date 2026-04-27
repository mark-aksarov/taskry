import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { UpdateTaskForm } from "../UpdateTaskForm";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { mockedUserSummaries } from "@/mocks/users";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskDetail as mockedTask } from "@/mocks/tasks";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskProvider } from "../UpdateTaskProvider/__stories__";

const meta = {
  title: "dashboard/tasks/UpdateTaskModal",
  component: UpdateTaskModal,
  decorators: [
    withOpenModal,
    withUpdateTaskProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "updateTask",
  },
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
