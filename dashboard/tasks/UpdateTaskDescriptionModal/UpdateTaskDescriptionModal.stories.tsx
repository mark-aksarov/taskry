import { mockedTaskDetail } from "@/mocks/tasks";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskDescriptionModal } from "./UpdateTaskDescriptionModal";
import { UpdateTaskDescriptionProvider } from "../UpdateTaskDescriptionContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/UpdateTaskDescriptionModal",
  component: UpdateTaskDescriptionModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateTaskDescriptionProvider>
        <Story />
      </UpdateTaskDescriptionProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateTaskDescription",
  },
} satisfies Meta<typeof UpdateTaskDescriptionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: mockedTaskDetail.id,
    taskDescription: mockedTaskDetail.title,
  },
} satisfies Story;
