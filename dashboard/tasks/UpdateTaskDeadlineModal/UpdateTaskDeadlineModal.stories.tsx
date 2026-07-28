import { mockedTaskDetail } from "@/mocks/tasks";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskDeadlineModal } from "./UpdateTaskDeadlineModal";
import { UpdateTaskDeadlineProvider } from "../UpdateTaskDeadlineContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/UpdateTaskDeadlineModal",
  component: UpdateTaskDeadlineModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateTaskDeadlineProvider>
        <Story />
      </UpdateTaskDeadlineProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateTaskDeadline",
  },
} satisfies Meta<typeof UpdateTaskDeadlineModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: mockedTaskDetail.id,
    taskDeadline: mockedTaskDetail.deadline,
  },
} satisfies Story;
