import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteSubtaskModal } from "../DeleteSubtaskModal";
import { DeleteSubtaskProvider } from "../DeleteSubtaskContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/subtasks/DeleteSubtaskModal",
  component: DeleteSubtaskModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <DeleteSubtaskProvider>
        <Story />
      </DeleteSubtaskProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deleteSubtask",
  },
} satisfies Meta<typeof DeleteSubtaskModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    subtaskId: 1,
    subtaskText: "Fake subtask",
  },
} satisfies Story;
