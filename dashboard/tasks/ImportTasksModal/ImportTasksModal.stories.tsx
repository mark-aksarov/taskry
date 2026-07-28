import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportTasksModal } from "./ImportTasksModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/ImportTasksModal",
  component: ImportTasksModal,
  decorators: [withOpenModal, withDashboardLayoutProviders],

  parameters: {
    modalId: "importTasks",
  },
} satisfies Meta<typeof ImportTasksModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
