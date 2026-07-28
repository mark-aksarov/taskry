import {
  UpdateTaskAssigneeForm,
  UpdateTaskAssigneeFormSkeleton,
} from "../UpdateTaskAssigneeForm";

import { mockedUserSummaries } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedTaskDetail as mockedTask } from "@/mocks/tasks";
import { UpdateTaskAssigneeModal } from "./UpdateTaskAssigneeModal";
import { UpdateTaskAssigneeProvider } from "../UpdateTaskAssigneeContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/UpdateTaskAssigneeModal",
  component: UpdateTaskAssigneeModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateTaskAssigneeProvider>
        <Story />
      </UpdateTaskAssigneeProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateTaskAssignee",
  },
} satisfies Meta<typeof UpdateTaskAssigneeModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateTaskAssigneeFormContainer: (
      <UpdateTaskAssigneeForm
        {...mockedTask}
        taskId={mockedTask.id}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    updateTaskAssigneeFormContainer: <UpdateTaskAssigneeFormSkeleton />,
  },
} satisfies Story;
