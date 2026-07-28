import { DeleteTaskModal } from "../DeleteTaskModal";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteTaskProvider } from "../DeleteTaskContext";
import { SelectedTasksProvider } from "../SelectedTasksContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/DeleteTaskModal",
  component: DeleteTaskModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedTasksProvider pageItems={[]}>
        <DeleteTaskProvider>
          <Story />
        </DeleteTaskProvider>
      </SelectedTasksProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "deleteTask",
  },
} satisfies Meta<typeof DeleteTaskModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
    taskTitle: "Task 1",
  },
} satisfies Story;
