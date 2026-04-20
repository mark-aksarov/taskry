import {
  UpdateTaskAssigneeForm,
  UpdateTaskAssigneeFormSkeleton,
} from "../UpdateTaskAssigneeForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedTaskDetail as mockedTask } from "@/mocks/tasks";
import { UpdateTaskAssigneeModal } from "./UpdateTaskAssigneeModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskAssigneeProvider } from "../UpdateTaskAssigneeProvider/__stories__";

const meta = {
  title: "dashboard/tasks/UpdateTaskAssigneeModal",
  component: UpdateTaskAssigneeModal,
  decorators: [
    withOpenModal,
    withUpdateTaskAssigneeProvider,
    withModalManagerProvider,
    withThemedBackground,
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
