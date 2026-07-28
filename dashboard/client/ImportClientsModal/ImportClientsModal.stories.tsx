import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportClientsModal } from "./ImportClientsModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/ImportClientsModal",
  component: ImportClientsModal,
  decorators: [withOpenModal, withDashboardLayoutProviders],

  parameters: {
    modalId: "importClients",
  },
} satisfies Meta<typeof ImportClientsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
