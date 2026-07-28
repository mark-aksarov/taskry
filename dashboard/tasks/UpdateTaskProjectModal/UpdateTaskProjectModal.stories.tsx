import {
  UpdateTaskProjectForm,
  UpdateTaskProjectFormSkeleton,
} from "../UpdateTaskProjectForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskDetail as mockedTask } from "@/mocks/tasks";
import { UpdateTaskProjectModal } from "./UpdateTaskProjectModal";
import { UpdateTaskProjectProvider } from "../UpdateTaskProjectContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/UpdateTaskProjectModal",
  component: UpdateTaskProjectModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateTaskProjectProvider>
        <Story />
      </UpdateTaskProjectProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateTaskProject",
  },
} satisfies Meta<typeof UpdateTaskProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateTaskProjectFormContainer: (
      <UpdateTaskProjectForm
        taskId={mockedTask.id}
        projectId={mockedTask.project.id}
        projectSelectItems={mockedProjectSummaries}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    updateTaskProjectFormContainer: <UpdateTaskProjectFormSkeleton />,
  },
} satisfies Story;
