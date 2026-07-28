import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateSubtaskModal } from "../CreateSubtaskModal";
import { CreateSubtaskProvider } from "../CreateSubtaskContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/subtasks/CreateSubtaskModal",
  component: CreateSubtaskModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CreateSubtaskProvider>
        <Story />
      </CreateSubtaskProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "createSubtask",
  },
} satisfies Meta<typeof CreateSubtaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
  },
} satisfies Story;
