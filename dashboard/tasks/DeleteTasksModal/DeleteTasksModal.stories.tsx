import { withOpenModal } from "@/.storybook/withOpenModal";
import { DeleteTasksModal } from "./DeleteTasksModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteTasksProvider } from "../DeleteTasksContext";
import { SelectedTasksProvider } from "../SelectedTasksContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/DeleteTasksModal",
  component: DeleteTasksModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedTasksProvider pageItems={[]}>
        <DeleteTasksProvider>
          <Story />
        </DeleteTasksProvider>
      </SelectedTasksProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "deleteTasks",
  },
} satisfies Meta<typeof DeleteTasksModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
