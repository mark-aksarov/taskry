import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { CreateTaskForm } from "../CreateTaskForm";
import { CreateTaskModal } from "./CreateTaskModal";
import { mockedUserSummaries } from "@/mocks/users";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateTaskProvider } from "../CreateTaskProvider/__stories__";

const meta = {
  title: "dashboard/tasks/CreateTaskModal",
  component: CreateTaskModal,
  decorators: [
    withOpenModal,
    withCreateTaskProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "createTask",
  },
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
