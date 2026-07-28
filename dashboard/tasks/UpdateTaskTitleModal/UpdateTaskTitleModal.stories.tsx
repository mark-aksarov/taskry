import { mockedTaskDetail } from "@/mocks/tasks";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskTitleModal } from "./UpdateTaskTitleModal";
import { UpdateTaskTitleProvider } from "../UpdateTaskTitleContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/UpdateTaskTitleModal",
  component: UpdateTaskTitleModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateTaskTitleProvider>
        <Story />
      </UpdateTaskTitleProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateTaskTitle",
  },
} satisfies Meta<typeof UpdateTaskTitleModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: mockedTaskDetail.id,
    taskTitle: mockedTaskDetail.title,
  },
} satisfies Story;
