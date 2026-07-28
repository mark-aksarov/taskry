import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateSubtaskModal } from "./UpdateSubtaskModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { UpdateSubtaskProvider } from "@/dashboard/subtasks/UpdateSubtaskContext";

const meta = {
  title: "dashboard/subtasks/UpdateSubtaskModal",
  component: UpdateSubtaskModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateSubtaskProvider>
        <Story />
      </UpdateSubtaskProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateSubtask",
  },
} satisfies Meta<typeof UpdateSubtaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    subtaskId: 1,
    taskId: 1,
    subtaskText: "Subtask placeholder text 1",
  },
} satisfies Story;
