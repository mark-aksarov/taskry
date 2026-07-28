import { mockedTaskDetail } from "@/mocks/tasks";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskStatusModal } from "./UpdateTaskStatusModal";
import { UpdateTaskStatusAltProvider } from "../UpdateTaskStatusAltContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/UpdateTaskStatusModal",
  component: UpdateTaskStatusModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateTaskStatusAltProvider>
        <Story />
      </UpdateTaskStatusAltProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateTaskStatus",
  },
} satisfies Meta<typeof UpdateTaskStatusModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: mockedTaskDetail.id,
    taskStatus: mockedTaskDetail.status,
  },
} satisfies Story;
